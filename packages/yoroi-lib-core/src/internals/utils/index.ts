import { MetadataJsonSchema, TxMetadata } from '../../models';
import * as WasmContract from '../../wasm-contract';

export const ERROR_NOT_IMPLEMENTED = 'ERROR HANDLING NOT IMPLEMENTED';

export enum AddInputResult {
  VALID = 0,
  TOO_SMALL = 1,
  OVERFLOW = 2,
  NO_NEED = 3
}

export function firstWithValue<T extends WasmContract.WasmProxy>(
  ...objs: T[]
): T {
  for (let o of objs) {
    if (o?.hasValue()) {
      return o;
    }
  }

  throw 'At least one of the arguments should have value';
}

export async function createMetadata(
  wasm: WasmContract.WasmModuleProxy,
  txMetadata: ReadonlyArray<TxMetadata>
): Promise<WasmContract.AuxiliaryData> {
  if (txMetadata.length === 0) {
    return await wasm.AuxiliaryData.empty();
  }

  const transactionMetadata =
    await wasm.GeneralTransactionMetadata.new();

  txMetadata.forEach(async (meta: TxMetadata) => {
    const metadatum = await wasm.encodeJsonStrToMetadatum(
      JSON.stringify(meta.data),
      MetadataJsonSchema.BasicConversions
    );
    const key = await wasm.BigNum.fromStr(meta.label);
    await transactionMetadata.insert(key, metadatum);
  });

  const auxData = await wasm.AuxiliaryData.new(transactionMetadata);

  return auxData;
}
