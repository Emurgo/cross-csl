import * as WasmContract from './wasm-contract';
import { BigNumber } from 'bignumber.js';

import { CardanoAddressedUtxo, Change, DefaultTokenEntry, MultiToken, MultiTokenConstruct, PRIMARY_ASSET_CONSTANTS, TxMetadata, TxOutput } from './models';
import { createMetadata } from './utils';
import { normalizeToAddress, toHexOrBase58 } from './utils/addresses';
import { getCardanoSpendingKeyHash, derivePrivateByAddressing } from './utils/crypto';
import { multiTokenFromCardanoValue, multiTokenFromRemote, parseTokenList } from './utils/assets';

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
  private _wasm: WasmContract.WasmModuleProxy;
  private _txBuilder: WasmContract.TransactionBuilder;
  private _certificates: ReadonlyArray<WasmContract.Certificate>;

  private _senderUtxos: ReadonlyArray<CardanoAddressedUtxo>;
  private _inputs: ReadonlyArray<{address: string, value: MultiTokenConstruct}>;
  private _totalInput: MultiTokenConstruct;
  private _outputs: ReadonlyArray<{address: string, value: MultiTokenConstruct}>;
  private _totalOutput: MultiTokenConstruct;
  private _fee: MultiTokenConstruct;
  private _change: ReadonlyArray<Change>;

  get senderUtxos(): ReadonlyArray<CardanoAddressedUtxo> {
    return this._senderUtxos;
  }

  get inputs(): ReadonlyArray<{address: string, value: MultiTokenConstruct}> {
    return this._inputs;
  }

  get totalInput(): MultiTokenConstruct {
    return this._totalInput;
  }

  get outputs(): ReadonlyArray<{address: string, value: MultiTokenConstruct}> {
    return this._outputs;
  }

  get totalOutput(): MultiTokenConstruct {
    return this._totalOutput;
  }

  get fee(): MultiTokenConstruct {
    return this._fee;
  }

  get change(): ReadonlyArray<Change> {
    return this._change;
  }

  /**
   * Initializes the class with the specific wasm types, outputs and change.
   * Even though this class can be instantiated directly, you should probably be getting
   * an instance of it through its abstraction UnsignedTx by calling YoroiLib.createUnsignedTx
   */
  constructor(
    wasm: WasmContract.WasmModuleProxy,
    txBuilder: WasmContract.TransactionBuilder,
    certificates: ReadonlyArray<WasmContract.Certificate>,
    senderUtxos: CardanoAddressedUtxo[],
    inputs: ReadonlyArray<{address: string, value: MultiTokenConstruct}>,
    totalInput: MultiTokenConstruct,
    outputs: ReadonlyArray<{address: string, value: MultiTokenConstruct}>,
    totalOutput: MultiTokenConstruct,
    fee: MultiTokenConstruct,
    change: ReadonlyArray<Change>
  ) {
    this._wasm = wasm;
    this._txBuilder = txBuilder;
    this._certificates = certificates;
    this._senderUtxos = senderUtxos;
    this._inputs = inputs;
    this._totalInput = totalInput;
    this._outputs = outputs;
    this._totalOutput = totalOutput;
    this._fee = fee;
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
      if (!wasmAddr?.hasValue()) {
        throw new Error(`WasmUnsignedTx.sign: utxo not a valid Shelley address`);
      }
      const keyHash = await getCardanoSpendingKeyHash(this._wasm, wasmAddr);
      const addrHex = Buffer.from(await wasmAddr.toBytes()).toString('hex');
      if (!keyHash?.hasValue()) {
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
      if (!wasmAddr?.hasValue()) {
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
  readonly senderUtxos: ReadonlyArray<CardanoAddressedUtxo>;
  readonly inputs: ReadonlyArray<{
    address: string,
    value: MultiTokenConstruct
  }>;
  readonly totalInput: MultiTokenConstruct;
  readonly outputs: ReadonlyArray<{
    address: string,
    value: MultiTokenConstruct
  }>;
  readonly totalOutput: MultiTokenConstruct;
  readonly fee: MultiTokenConstruct;
  readonly change: ReadonlyArray<Change>;
  sign(
    keyLevel: number,
    privateKey: string,
    stakingKeyWits: Set<string>,
    metadata: TxMetadata
  ): Promise<void>;
}

export async function genWasmUnsignedTx(
  wasm: WasmContract.WasmModuleProxy,
  txBuilder: WasmContract.TransactionBuilder,
  certificates: ReadonlyArray<WasmContract.Certificate>,
  senderUtxos: CardanoAddressedUtxo[],
  change: ReadonlyArray<Change>,
  defaults: DefaultTokenEntry,
  networkId: number
): Promise<WasmUnsignedTx> {
  return new WasmUnsignedTx(
    wasm,
    txBuilder,
    certificates,
    senderUtxos,
    await genWasmUnsignedTxInputs(txBuilder, senderUtxos, networkId),
    await genWasmUnsignedTxTotalInput(txBuilder, change, defaults),
    await genWasmUnsignedTxOutputs(txBuilder, networkId),
    await genWasmUnsignedTxTotalOutput(txBuilder, defaults),
    await genWasmUnsignedTxFee(txBuilder, defaults, networkId),
    change
  )
}

async function genWasmUnsignedTxInputs(
  txBuilder: WasmContract.TransactionBuilder,
  senderUtxos: CardanoAddressedUtxo[],
  networkId: number):
Promise<ReadonlyArray<{
  address: string,
  value: MultiTokenConstruct,
}>> {
  const body = await txBuilder.build();
  const values = [] as {
    address: string,
    value: MultiTokenConstruct,
  }[];

  const inputs = await body.inputs();
  for (let i = 0; i < await inputs.len(); i++) {
    const input = await inputs.get(i);

    const txIdBytes = await input.transactionId().then(x => x.toBytes())
    const key = {
      hash: Buffer.from(txIdBytes).toString('hex'),
      index: await input.index(),
    };

    const utxoEntry = senderUtxos.find(
      utxo => utxo.txHash === key.hash && utxo.txIndex === key.index
    );

    if (!utxoEntry) {
      throw new Error(`missing input for ${JSON.stringify(key)}`);
    }

    const ma = multiTokenFromRemote(utxoEntry, networkId);
    values.push({
      value: {
        defaults: ma.defaults,
        values: ma.values
      },
      address: utxoEntry.receiver,
    });
  }

  return values
}

async function genWasmUnsignedTxTotalInput(
  txBuilder: WasmContract.TransactionBuilder,
  changes: ReadonlyArray<Change>,
  defaults: DefaultTokenEntry):
Promise<MultiTokenConstruct> {
  const values = await multiTokenFromCardanoValue(
    await txBuilder
      .getImplicitInput()
      .then(async (x) => x.checkedAdd(await txBuilder.getExplicitInput())),
    defaults
  );

  for (const change of changes) {
    values.joinSubtractMutable(change.values);
  }

  return {
    defaults: values.defaults,
    values: values.values
  };
}

async function genWasmUnsignedTxOutputs(
  txBuilder: WasmContract.TransactionBuilder,
  networkId: number):
Promise<ReadonlyArray<{
  address: string,
  value: MultiTokenConstruct,
}>> {
  const body = await txBuilder.build();

  const values = [] as {
    address: string,
    value: MultiTokenConstruct
  }[];

  const outputs = await body.outputs();
    for (let i = 0; i < await outputs.len(); i++) {
      const output = await outputs.get(i);

      const outputAddressBytes = await output.address().then(x => x.toBytes());
      const ma = await multiTokenFromCardanoValue(
        await output.amount(),
        {
          defaultIdentifier: PRIMARY_ASSET_CONSTANTS.Cardano,
          defaultNetworkId: networkId
        },
      );
      values.push({
        value: {
          defaults: ma.defaults,
          values: ma.values
        },
        address: Buffer.from(outputAddressBytes).toString('hex'),
      });
    }

    return values;
}

async function genWasmUnsignedTxTotalOutput(
  txBuilder: WasmContract.TransactionBuilder,
  defaults: DefaultTokenEntry):
Promise<MultiTokenConstruct> {
  const ma = await multiTokenFromCardanoValue(
    await txBuilder.getExplicitOutput(),
    defaults);
  return {
    defaults: ma.defaults,
    values: ma.values
  }
}

async function genWasmUnsignedTxFee(
  txBuilder: WasmContract.TransactionBuilder,
  defaults: DefaultTokenEntry,
  networkId: number
): Promise<MultiTokenConstruct> {
  const values = new MultiToken(
    [],
    defaults
  );

  const wasmFee = await txBuilder.getFeeIfSet();
  const fee = wasmFee.hasValue()
    ? new BigNumber(await wasmFee.toStr())
    : new BigNumber('0')

  values.add({
    identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
    amount: fee.plus(await txBuilder.getDeposit().then(x => x.toStr())),
    networkId: networkId,
  });

  return {
    defaults: values.defaults,
    values: values.values
  }
}

function genWasmUnsignedTxSenderAddresses(
  senderUtxos: CardanoAddressedUtxo[]
): ReadonlyArray<string> {
  return senderUtxos.map(x => x.receiver);
}

async function genWasmUnsignedTxReceivers(
  wasm: WasmContract.WasmModuleProxy,
  txBuilder: WasmContract.TransactionBuilder,
): Promise<ReadonlyArray<string>> {
  const outputs = await txBuilder.build().then(x => x.outputs());

  const outputStrings = [] as string[];
  for (let i = 0; i < await outputs.len(); i++) {
    outputStrings.push(await toHexOrBase58(wasm, await outputs.get(i).then(x => x.address())));
  }

  return outputStrings;
}