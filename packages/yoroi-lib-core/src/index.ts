import { BigNumber } from 'bignumber.js';
import * as WasmContract from './wasm-contract';
import {
  normalizeToAddress,
  cardanoValueFromMultiToken,
  minRequiredForChange
} from './utils';
import {
  Address,
  Addressing,
  AddressingAddress,
  CardanoHaskellConfig,
  LinearFee,
  MetadataJsonSchema,
  MultiToken,
  RemoteUnspentOutput,
  TxMetadata,
  TxOptions,
  TxOutput
} from './models';

const defaultTtlOffset = 7200;

export const createYoroiLib = (wasmV4: WasmContract.WasmContract): YoroiLib => {
  return new YoroiLib(wasmV4);
};

export class YoroiLib {
  private readonly _wasmV4: WasmContract.WasmContract;

  get Wasm(): WasmContract.WasmContract {
    return this._wasmV4;
  }

  constructor(wasmV4: WasmContract.WasmContract) {
    this._wasmV4 = wasmV4;
  }

  async createUnsignedTx(
    config: CardanoHaskellConfig,
    txOptions: TxOptions
  ): Promise<void> {
    await this.createUnsignedTxForUtxos(config, txOptions);
  }

  async encryptWithPassword(
    password: string,
    salt: string,
    nonce: string,
    data: string
  ): Promise<string> {
    return await this._wasmV4.encryptWithPassword(
      password,
      salt,
      nonce,
      data
    );
  }

  async decryptWithPassword(password: string, data: string): Promise<string> {
    return await this._wasmV4.decryptWithPassword(password, data);
  }

  private async createUnsignedTxForUtxos(
    config: CardanoHaskellConfig,
    txOptions: TxOptions
  ): Promise<void> {
    const protocolParams = {
      keyDeposit: this._wasmV4.BigNum.fromStr(config.keyDeposit),
      linearFee: this._wasmV4.LinearFee.new(
        await this._wasmV4.BigNum.fromStr(config.linearFee.coefficient),
        await this._wasmV4.BigNum.fromStr(config.linearFee.constant)
      ),
      minimumUtxoVal: this._wasmV4.BigNum.fromStr(config.minimumUtxoVal),
      poolDeposit: this._wasmV4.BigNum.fromStr(config.poolDeposit),
      networkId: config.networkId
    };

    const txMetadata =
      txOptions.metadata !== undefined
        ? this.createMetadata(txOptions.metadata)
        : null;

    if (txOptions.sendAll) {
      // ToDo
    } else {
    }
  }

  private async newAdaUnsignedTxFromUtxo(
    outputs: ReadonlyArray<TxOutput>,
    changeAdaAddr: AddressingAddress,
    utxos: Array<RemoteUnspentOutput>,
    absSlotNumber: BigNumber,
    protocolParams: {
      linearFee: WasmContract.LinearFee,
      minimumUtxoVal: WasmContract.BigNum,
      poolDeposit: WasmContract.BigNum,
      keyDeposit: WasmContract.BigNum
    },
    certificates: ReadonlyArray<WasmContract.Certificate>,
    withdrawals: ReadonlyArray<{
      address: WasmContract.RewardAddress,
      amount: WasmContract.BigNum,
    }>,
    auxData: WasmContract.AuxiliaryData,
    allowNoOutputs: boolean) {

    // HELPERS
    const shouldForceChange = async (
      assetsForChange: WasmContract.MultiAsset
    ): Promise<boolean> => {
      const noOutputDisallowed = !allowNoOutputs && outputs.length === 0;
      if (noOutputDisallowed && changeAdaAddr == null) {
        // throw new NoOutputsError();
        throw 'IMPLEMENT ERROR HANDLING'
      }
      if (assetsForChange != null && await assetsForChange.len() > 0) {
        return true;
      }
      return noOutputDisallowed;
    };
    // HELPERS

    const emptyAsset = await this.Wasm.MultiAsset.new();
    await shouldForceChange(undefined);

    const txBuilder = await this.Wasm.TransactionBuilder.new(
      protocolParams.linearFee,
      protocolParams.minimumUtxoVal,
      protocolParams.poolDeposit,
      protocolParams.keyDeposit
    );

    if (certificates.length > 0) {
      const certsWasm = await this.Wasm.Certificates.new()
      for (const cert of certificates) {
        certsWasm.add(cert)
      }
      await txBuilder.setCerts(certsWasm);
    }

    if (auxData !== undefined){
      await txBuilder.setAuxiliaryData(auxData);
    }

    if (withdrawals.length > 0) {
      const withdrawalWasm = await this.Wasm.Withdrawals.new();
      for (const withdrawal of withdrawals) {
        await withdrawalWasm.insert(
          withdrawal.address,
          withdrawal.amount,
        );
      }
      
      await txBuilder.setWithdrawals(withdrawalWasm);
    }

    await txBuilder.setTtl(absSlotNumber.plus(defaultTtlOffset).toNumber());

    {
      for (const output of outputs) {
        const wasmReceiver = await normalizeToAddress(this.Wasm, output.address);
        if (wasmReceiver == null) {
          // throw new Error(`${nameof(newAdaUnsignedTxFromUtxo)} receiver not a valid Shelley address`);
          throw 'IMPLEMENT ERROR HANDLING'
        }
        await txBuilder.addOutput(
          await this.Wasm.TransactionOutput.new(
            wasmReceiver,
            await cardanoValueFromMultiToken(this.Wasm, output.amount),
          )
        );
      }
    }

    // output excluding fee
    const targetOutput = await (await txBuilder
      .getExplicitOutput())
      .checkedAdd(await this.Wasm.Value.new(await txBuilder.getDeposit()));

    // pick inputs
    // const usedUtxos: Array<RemoteUnspentOutput> = [];
    const usedUtxos = [];
    {
      // recall: we might have some implicit input to start with from deposit refunds
      const implicitSum = await txBuilder.getImplicitInput();

      // this flag is set when one extra input is added
      let oneExtraAdded = false;
      // add utxos until we have enough to send the transaction
      for (const utxo of utxos) {
        if (oneExtraAdded) {
          break;
        }
        const currentInputSum = await txBuilder.getExplicitInput()
          .then(x => x.checkedAdd(implicitSum))
        const output = await targetOutput
          .checkedAdd(await this.Wasm.Value.new(await txBuilder.minFee()));
        const remainingNeeded = await output.clampedSub(currentInputSum);

        // update amount required to make sure we have ADA required for change UTXO entry
        const sub = await (await currentInputSum.multiasset()).sub(await output.multiasset());

        if (shouldForceChange(sub ?? emptyAsset)) {
          if (changeAdaAddr == null) {
            // throw new NoOutputsError();
            throw 'IMPLEMENT ERROR HANDLING'
          }
          const difference = await currentInputSum.clampedSub(output);
          const minimumNeededForChange = await minRequiredForChange(
            this.Wasm,
            txBuilder,
            changeAdaAddr,
            difference,
            protocolParams
          );
          const adaNeededLeftForChange = await minimumNeededForChange.clampedSub(await difference.coin());
          const remainingNeededCoin = await remainingNeeded.coin();
          if (await remainingNeededCoin.compare(adaNeededLeftForChange) < 0) {
            await remainingNeeded.setCoin(adaNeededLeftForChange);
          }
        }

        // stop if we've added all the assets we needed
        {
          const remainingAssets = await remainingNeeded.multiasset();
          const remainingNeededCoin = await remainingNeeded.coin();
          if (
            await remainingNeededCoin.compare(await this.Wasm.BigNum.fromStr('0')) === 0 &&
            (remainingAssets == null || await remainingAssets.len() === 0) &&
            usedUtxos.length > 0
          ) {
            // ToDo: do we need this extra input logic?
            break;
            // if (oneExtraInput) {
            //   // We've added all the assets we need, but we add one extra.
            //   // Set the flag so that the adding loop stops after this extra one is added.
            //   oneExtraAdded = true;
            // } else {
            //   break;
            // }
          }
        }

        const added = await addUtxoInput(
          wasm,
          txBuilder,
          oneExtraAdded ?
            undefined : // avoid 'NO_NEED'
            {
              value: remainingNeeded,
            hasInput: usedUtxos.length > 0,
            },
          utxo,
          true,
          { networkId: protocolParams.networkId },
        );
        if (added !== AddInputResult.VALID) continue;

        usedUtxos.push(utxo);
      }
      if (usedUtxos.length === 0) {
        throw new NotEnoughMoneyToSendError();
      }
      // check to see if we have enough balance in the wallet to cover the transaction
      {
        const currentInputSum = txBuilder.get_explicit_input().checked_add(implicitSum);

        // need to recalculate each time because fee changes
        const output = targetOutput
            .checked_add(RustModule.WalletV4.Value.new(txBuilder.min_fee()));

        const compare = currentInputSum.compare(output);
        const enoughInput = compare != null && compare >= 0;

        const forceChange = shouldForceChange(
          currentInputSum.multiasset()?.sub(output.multiasset() ?? emptyAsset)
        );
        if (forceChange) {
          if (changeAdaAddr == null) throw new NoOutputsError();
          if (!enoughInput) {
            throw new NotEnoughMoneyToSendError();
          }
          const difference = currentInputSum.checked_sub(output);
          const minimumNeededForChange = minRequiredForChange(
            txBuilder,
            changeAdaAddr,
            difference,
            protocolParams
          );
          if (difference.coin().compare(minimumNeededForChange) < 0) {
            throw new NotEnoughMoneyToSendError();
          }
        }
        if (!forceChange && !enoughInput) {
          throw new NotEnoughMoneyToSendError();
        }
      }
    }
  }

  private async createMetadata(txMetadata: ReadonlyArray<TxMetadata>) {
    const transactionMetadata =
      await this.Wasm.GeneralTransactionMetadata.new();

    txMetadata.forEach(async (meta: TxMetadata) => {
      const metadatum = await this.Wasm.encodeJsonStrToMetadatum(
        JSON.stringify(meta.data),
        MetadataJsonSchema.BasicConversions
      );
      const key = await this.Wasm.BigNum.fromStr(meta.label);
      await transactionMetadata.insert(key, metadatum);
    });

    const auxData = await this.Wasm.AuxiliaryData.new(
      transactionMetadata
    );
  }
}

