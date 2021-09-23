import { WasmContract } from './wasm-contract'

export const createYoroiLib = (wasmV4: WasmContract): YoroiLib => {
  return new YoroiLib(wasmV4)
}

export class YoroiLib {
  private _wasmV4: WasmContract

  get WasmContract(): WasmContract {
    return this._wasmV4
  }

  constructor(wasmV4: WasmContract) {
    this._wasmV4 = wasmV4
  }

  async createUnsignedTx(config: CardanoHaskellConfig, txOptions: TxOptions): Promise<void> {
    await this.createUnsignedTxForUtxos(config, txOptions)
  }

  async encryptWithPassword(password: string, salt: string, nonce: string, data: string): Promise<string> {
    return await this._wasmV4.encrypt_with_password(
      password,
      salt,
      nonce,
      data
    )
  }

  async decryptWithPassword(password: string, data: string): Promise<string> {
    return await this._wasmV4.decrypt_with_password(password, data)
  }

  private async createUnsignedTxForUtxos(
    config: CardanoHaskellConfig,
    txOptions: TxOptions
    ): Promise<void> {
    const protocolParams = {
      keyDeposit: this._wasmV4.BigNum.from_str(config.keyDeposit),
      linearFee: this._wasmV4.LinearFee.new(
        await this._wasmV4.BigNum.from_str(config.linearFee.coefficient),
        await this._wasmV4.BigNum.from_str(config.linearFee.constant)
      ),
      minimumUtxoVal: this._wasmV4.BigNum.from_str(config.minimumUtxoVal),
      poolDeposit: this._wasmV4.BigNum.from_str(config.poolDeposit),
      networkId: config.networkId
    }

    const txMetadata = txOptions.metadata !== undefined
      ? this.createMetadata(txOptions.metadata)
      : null

    if (txOptions.sendAll) {
      // ToDo
    } else {

    }
  }

  private async createMetadata(txMetadata: ReadonlyArray<TxMetadata>) {
    const transactionMetadata = await this.WasmContract.GeneralTransactionMetadata.new()

    txMetadata.forEach(async (meta: TxMetadata) => {
      const metadatum = await this.WasmContract.encode_json_str_to_metadatum(
        JSON.stringify(meta.data),
        MetadataJsonSchema.BasicConversions
      )
      const key = await this.WasmContract.BigNum.from_str(meta.label)
      await transactionMetadata.insert(key, metadatum)
    })

    const auxData = await this.WasmContract.AuxiliaryData.new(transactionMetadata)
  }
}

export interface TxOptions {
  receiver: string
  sendAll: boolean
  metadata?: ReadonlyArray<TxMetadata>
}

export interface TxMetadata {
  label: string
  data: any
}

export interface CardanoHaskellConfig {
  keyDeposit: string
  linearFee: LinearFee
  minimumUtxoVal: string
  poolDeposit: string
  networkId: string
}

export interface LinearFee {
  coefficient: string
  constant: string
}

export enum MetadataJsonSchema {
  NoConversions = 0,
  BasicConversions = 1,
  DetailedSchema = 2,
}
