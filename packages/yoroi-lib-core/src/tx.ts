import * as WasmContract from './wasm-contract';
import { BigNumber } from 'bignumber.js';

import { CardanoAddressedUtxo, Change, RemoteUnspentOutput, TxMetadata, TxOutput } from './models';
import { createMetadata, derivePrivateByAddressing, getCardanoSpendingKeyHash, normalizeToAddress } from './utils';

const HARD_DERIVATION_START: 2147483648 = 0x80000000;

interface Bip44DerivationLevel {
  level: number
}

const Bip44DerivationLevels = {
  ROOT: {
    level: 0
  } as Bip44DerivationLevel,
  PURPOSE: {
    level: 1
  } as Bip44DerivationLevel,
  COIN_TYPE: {
    level: 2
  } as Bip44DerivationLevel,
  ACCOUNT: {
    level: 3
  } as Bip44DerivationLevel,
  CHAIN: {
    level: 4
  } as Bip44DerivationLevel,
  ADDRESS: {
    level: 5
  } as Bip44DerivationLevel
}

export class WasmUnsignedTx implements UnsignedTx {
  private _wasm: WasmContract.WasmContract;
  private _txBuilder: WasmContract.TransactionBuilder;
  private _certificates: ReadonlyArray<WasmContract.Certificate>;
  private _senderUtxos: CardanoAddressedUtxo[];
  private _outputs: TxOutput[];
  private _change: Change[];

  get senderUtxos(): ReadonlyArray<CardanoAddressedUtxo> {
    return this._senderUtxos;
  }
  
  get change(): ReadonlyArray<Change> {
    return this._change;
  }

  get outputs(): ReadonlyArray<TxOutput> {
    return this._outputs;
  }

  constructor(
    wasm: WasmContract.WasmContract,
    txBuilder: WasmContract.TransactionBuilder,
    certificates: ReadonlyArray<WasmContract.Certificate>,
    senderUtxos: CardanoAddressedUtxo[],
    outputs: TxOutput[],
    change: Change[]
  ) {
    this._wasm = wasm;
    this._txBuilder = txBuilder;
    this._certificates = certificates;
    this._senderUtxos = senderUtxos;
    this._outputs = outputs;
    this._change = change;
  }

  async sign(
    keyLevel: number,
    privateKey: string,
    stakingKeyWits: Set<string>,
    metadata: TxMetadata
  ): Promise<void> {
    const rootPk = await (async () => {
      if (privateKey != null) {
        return await this._wasm.Bip32PrivateKey.fromBytes(
          Buffer.from(privateKey, 'hex')
        );
      }
      // ToDo: handle the scenario bellow
      // if (request.recoveryPhrase != null) {
      //   return this.stores.yoroiTransfer.mode?.extra === 'ledger'
      //     ? generateLedgerWalletRootKey(request.recoveryPhrase)
      //     : generateWalletRootKey(request.recoveryPhrase);
      // }
      throw new Error(`no key specified`);
    })();

    const accountIndex = 0 + HARD_DERIVATION_START;

    const signingKey = await rootPk
      .derive(2147483692) // WalletTypePurpose.BIP44
      .then(x => x.derive(2147485463)) // CoinTypes.CARDANO
      .then(x => x.derive(accountIndex));

    const seenByronKeys: Set<string> = new Set();
    const seenKeyHashes: Set<string> = new Set();
    const deduped: Array<CardanoAddressedUtxo> = [];
    for (const senderUtxo of this.senderUtxos) {
      const wasmAddr = await normalizeToAddress(this._wasm, senderUtxo.receiver);
      if (!wasmAddr.hasValue()) {
        throw new Error(`WasmUnsignedTx.sign: utxo not a valid Shelley address`);
      }
      const keyHash = await getCardanoSpendingKeyHash(this._wasm, wasmAddr);
      const addrHex = Buffer.from(await wasmAddr.toBytes()).toString('hex');
      if (!keyHash.hasValue()) {
        if (!seenByronKeys.has(addrHex)) {
          seenByronKeys.add(addrHex);
          deduped.push(senderUtxo);
        }
        continue;
      }
      if (!keyHash.hasValue()) {
        throw new Error(`WasmUnsignedTx.sign: cannot sign script inputs`);
      }
      {
        const keyHex = Buffer.from(await keyHash.toBytes()).toString('hex');
        if (!seenKeyHashes.has(keyHex)) {
          seenKeyHashes.add(keyHex);
          deduped.push(senderUtxo);
        }
      }
    }

    /*
      ToDo:
      In the extension, what would be the _txBuilder here can also be either a TransactionBuilder or a TransactionBody.
      Verify how and if this needs to be replicated here as well.
    */

    const txBody = await this._txBuilder.build();
    const txHash = await this._wasm.hashTransaction(txBody);

    const vkeyWits = await this._wasm.Vkeywitnesses.new();
    const bootstrapWits = await this._wasm.BootstrapWitnesses.new();

    await this.addWitnesses(
      txHash,
      deduped,
      keyLevel,
      signingKey,
      vkeyWits,
      bootstrapWits,
    );

    const stakingKeySigSet = new Set<string>();
    for (const witness of stakingKeyWits) {
      if (stakingKeySigSet.has(witness)) {
        continue;
      }
      stakingKeySigSet.add(witness);
      vkeyWits.add(
        await this._wasm.Vkeywitness.fromBytes(
          Buffer.from(witness, 'hex')
        )
      );
    }

    const witnessSet = await this._wasm.TransactionWitnessSet.new();
    if (await bootstrapWits.len() > 0) await witnessSet.setBootstraps(bootstrapWits);
    if (await vkeyWits.len() > 0) await witnessSet.setVkeys(vkeyWits);

    const aux = await createMetadata(this._wasm, [metadata])

    const tx = await this._wasm.Transaction.new(
      txBody,
      witnessSet,
      aux
    );
  }

  async fee(): Promise<BigNumber> {
    const fee = await this._txBuilder.getFeeIfSet();
    if (fee.hasValue()) {
      return new BigNumber(await fee.toStr());
    }

    return undefined;
  }

  private async addWitnesses(
    txHash: WasmContract.TransactionHash,
    uniqueUtxos: Array<CardanoAddressedUtxo>, // pre-req: does not contain duplicate keys
    keyLevel: number,
    signingKey: WasmContract.Bip32PrivateKey,
    vkeyWits: WasmContract.Vkeywitnesses,
    bootstrapWits: WasmContract.BootstrapWitnesses,
  ): Promise<void> {
    // get private keys
    const privateKeys = await Promise.all(uniqueUtxos.map(async (utxo) => {
      const lastLevelSpecified = utxo.addressing.startLevel + utxo.addressing.path.length - 1;
      if (lastLevelSpecified !== Bip44DerivationLevels.ADDRESS.level) {
        throw new Error(`WasmUnsignedTx.addWitnesses incorrect addressing size`);
      }
      return await derivePrivateByAddressing(
        utxo,
        {
          level: keyLevel,
          key: signingKey,
        }
      );
    }));
      
    // sign the transactions
    for (let i = 0; i < uniqueUtxos.length; i++) {
      const wasmAddr = await normalizeToAddress(this._wasm, uniqueUtxos[i].receiver);
      if (!wasmAddr.hasValue()) {
        throw new Error(`WasmUnsignedTx.addWitnesses utxo not a valid Shelley address`);
      }
      const byronAddr = await this._wasm.ByronAddress.fromAddress(wasmAddr);
      if (!byronAddr.hasValue()) {
        const vkeyWit = await this._wasm.makeVkeyWitness(
          txHash,
          await privateKeys[i].toRawKey(),
        );
        vkeyWits.add(vkeyWit);
      } else {
        const bootstrapWit = await this._wasm.makeIcarusBootstrapWitness(
          txHash,
          byronAddr,
          privateKeys[i],
        );
        bootstrapWits.add(bootstrapWit);
      }
    }
  }
  
}

export interface UnsignedTx {
  get senderUtxos(): ReadonlyArray<CardanoAddressedUtxo>;
  get outputs(): ReadonlyArray<TxOutput>;
  get change(): ReadonlyArray<Change>;
  fee(): Promise<BigNumber>;
  sign(
    keyLevel: number,
    privateKey: string,
    stakingKeyWits: Set<string>,
    metadata: TxMetadata
  ): Promise<void>;
}