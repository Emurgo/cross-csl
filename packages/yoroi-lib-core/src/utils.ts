import { BigNumber } from 'bignumber.js';
import { Address, Addressing, AddressingAddress, DefaultTokenEntry, MultiToken, PRIMARY_ASSET_CONSTANTS, RemoteUnspentOutput } from './models';
import * as WasmContract from './wasm-contract';

export const ERROR_NOT_IMPLEMENTED = 'ERROR HANDLING NOT IMPLEMENTED';

enum AddInputResult {
  VALID = 0,
  TOO_SMALL = 1,
  OVERFLOW = 2,
  NO_NEED = 3
}

export async function normalizeToAddress(
  wasm: WasmContract.WasmContract,
  addr: string
): Promise<WasmContract.Address> {
  // in Shelley, addresses can be base16, bech32 or base58
  // this function, we try parsing in all encodings possible

  // 1) Try converting from base58
  if (wasm.ByronAddress.isValid(addr)) {
    const byronAddr = await wasm.ByronAddress.fromBase58(addr);
    return await byronAddr.toAddress();
  }

  // 2) If already base16, simply return
  try {
    return await wasm.Address.fromBytes(
      Buffer.from(addr, 'hex')
    );
  } catch (_e) {}

  // 3) Try converting from base32
  try {
    return await wasm.Address.fromBech32(addr);
  } catch (_e) {}

  return undefined;
}

export async function cardanoValueFromMultiToken(
  wasm: WasmContract.WasmContract,
  tokens: MultiToken,
): Promise<WasmContract.Value> {
  const value = await wasm.Value.new(
    await wasm.BigNum.fromStr(tokens.getDefaultEntry().amount.toString())
  );
  // recall: primary asset counts towards size
  if (tokens.size() === 1) return value;

  const assets = await wasm.MultiAsset.new();
  for (const entry of tokens.nonDefaultEntries()) {
    const { policyId, name } = await identifierToCardanoAsset(wasm, entry.identifier);

    const policyContent = await assets.get(policyId) ?? await wasm.Assets.new();

    await policyContent.insert(
      name,
      await wasm.BigNum.fromStr(entry.amount.toString())
    );
    // recall: we always have to insert since WASM returns copies of objects
    assets.insert(policyId, policyContent);
  }
  if (await assets.len() > 0) {
    await value.setMultiasset(assets);
  }
  return value;
}

export async function identifierToCardanoAsset(
  wasm: WasmContract.WasmContract,
  identifier: string,
): Promise<{
  policyId: WasmContract.ScriptHash,
  name: WasmContract.AssetName,
}> {
  const parts = identifier.split('.');
  return {
    policyId: await wasm.ScriptHash.fromBytes(Buffer.from(parts[0], 'hex')),
    name: await wasm.AssetName.new(Buffer.from(parts[1], 'hex')),
  };
}

export async function minRequiredForChange(
  wasm: WasmContract.WasmContract,
  txBuilder: WasmContract.TransactionBuilder,
  changeAdaAddr: AddressingAddress,
  value: WasmContract.Value,
  protocolParams: {
    linearFee: WasmContract.LinearFee,
    minimumUtxoVal: WasmContract.BigNum,
  },
): Promise<WasmContract.BigNum> {
  const wasmChange = await normalizeToAddress(wasm, changeAdaAddr.address);
  if (wasmChange == null) {
    // throw new Error(`${nameof(minRequiredForChange)} change not a valid Shelley address`);
    throw ERROR_NOT_IMPLEMENTED;
  }
  const minimumAda = await wasm.minAdaRequired(
    value,
    protocolParams.minimumUtxoVal
  );

  // we may have to increase the value used up to the minimum ADA required
  const baseValue = (async () => {
    const coin = await value.coin();
    if (await coin.compare(minimumAda) < 0) {
      const newVal = await wasm.Value.new(minimumAda);
      const assets = await value.multiasset();
      if (assets) {
        await newVal.setMultiasset(assets);
      }
      return newVal;
    }
    return value;
  })();
  const minRequired = await txBuilder
      .feeForOutput(await wasm.TransactionOutput.new(
        wasmChange,
        await baseValue,
      )).then(x => x.checkedAdd(minimumAda));
  return minRequired;
}

async function addUtxoInput(
  wasm: WasmContract.WasmContract,
  txBuilder: WasmContract.TransactionBuilder,
  remaining: {
    hasInput: boolean, // every tx requires at least one input
    value: WasmContract.Value
  },
  input: RemoteUnspentOutput,
  /* don't add the input if the amount is smaller than the fee to add it to the tx */
  excludeIfSmall: boolean,
  protocolParams: {
    networkId: number,
  },
): Promise<void> {
  const wasmAddr = await normalizeToAddress(wasm, input.receiver);
  if (wasmAddr == null) {
    // throw new Error(`${nameof(addUtxoInput)} input not a valid Shelley address`);
    throw ERROR_NOT_IMPLEMENTED;
  }
  const txInput = await utxoToTxInput(wasm, input);
  const wasmAmount = await cardanoValueFromRemoteFormat(wasm, input);

  const skipOverflow = async (): Promise<AddInputResult> => {
    /**
     * UTXOs can only contain at most u64 of a value
     * so if the sum of UTXO inputs for a tx > u64
     * it can cause the tx to fail (due to overflow) in the output / change
     *
     * This can be addressed by splitting up a tx to use multiple outputs / multiple change
     * and this just requires more ADA to cover the min UTXO of these added inputs
     * but as a simple solution for now, we just block > u64 inputs of any token
     * This isn't a great workaround since it means features like sendAll may end up not sending all
    */
    const currentInputSum = await txBuilder
      .getExplicitInput()
      .then(async (x) => x.checkedAdd(await txBuilder.getImplicitInput()));
    try {
      await currentInputSum.checkedAdd(wasmAmount);
    } catch (e) {
      return AddInputResult.OVERFLOW;
    }
    return AddInputResult.VALID;
  }

  const skipInput = async (): Promise<AddInputResult> => {
    if (remaining == null) return skipOverflow();

    const defaultEntry = {
      defaultNetworkId: protocolParams.networkId,
      defaultIdentifier: PRIMARY_ASSET_CONSTANTS.Cardano,
    };
    const tokenSetInInput = new Set(input.assets.map(asset => asset.assetId));
    const remainingTokens = multiTokenFromCardanoValue(
      remaining.value,
      defaultEntry,
    );
    const includedTargets = remainingTokens.nonDefaultEntries().filter(
      entry => tokenSetInInput.has(entry.identifier)
    );

    if (remainingTokens.getDefaultEntry().amount.gt(0) && new BigNumber(input.amount).gt(0)) {
      includedTargets.push(remainingTokens.getDefaultEntry());
    }

    // it's possible to have no target left and yet have no input added yet
    // due to refunds in Cardano
    // so we still want to add the input in this case even if we don't care about the coins in it
    if (includedTargets.length === 0 && remaining.hasInput) {
      return AddInputResult.NO_NEED;
    }

    const onlyDefaultEntry = (
      includedTargets.length === 1 &&
      includedTargets[0].identifier === defaultEntry.defaultIdentifier
    );
    // ignore UTXO that contribute less than their fee if they also don't contribute a token
    if (onlyDefaultEntry && excludeIfSmall) {
      const feeForInput = new BigNumber(
        txBuilder.fee_for_input(
          wasmAddr,
          txInput,
          wasmAmount
        ).to_str()
      );
      if (feeForInput.gt(input.amount)) {
        return AddInputResult.TOO_SMALL;
      }
    }

    return skipOverflow();
  }

  const skipResult = skipInput();
  if (skipResult !== AddInputResult.VALID) {
    return skipResult;
  }

  txBuilder.add_input(
    wasmAddr,
    txInput,
    wasmAmount
  );
  return AddInputResult.VALID;
}

async function utxoToTxInput(
  wasm: WasmContract.WasmContract,
  utxo: RemoteUnspentOutput,
): Promise<WasmContract.TransactionInput> {
  return await wasm.TransactionInput.new(
    await wasm.TransactionHash.fromBytes(
      Buffer.from(utxo.txHash, 'hex'),
    ),
    utxo.txIndex,
  );
}

export async function cardanoValueFromRemoteFormat(
  wasm: WasmContract.WasmContract,
  utxo: RemoteUnspentOutput,
): Promise<WasmContract.Value> {
  const value = await wasm.Value.new(
    await wasm.BigNum.fromStr(utxo.amount)
  );
  if (utxo.assets.length === 0) return value;

  const assets = await wasm.MultiAsset.new();
  for (const entry of utxo.assets) {
    const { policyId, name } = await identifierToCardanoAsset(wasm, entry.assetId);

    const policyContent = await assets.get(policyId) ?? await wasm.Assets.new();

    await policyContent.insert(
      name,
      await wasm.BigNum.fromStr(entry.amount.toString())
    );
    // recall: we always have to insert since WASM returns copies of objects
    await assets.insert(policyId, policyContent);
  }
  if (await assets.len() > 0) {
    await value.setMultiasset(assets);
  }
  return value;
}

export async function multiTokenFromCardanoValue(
  value: WasmContract.Value,
  defaults: DefaultTokenEntry,
): Promise<MultiToken> {
  const multiToken = new MultiToken([], defaults);
  multiToken.add({
    amount: new BigNumber(value.coin().to_str()),
    identifier: defaults.defaultIdentifier,
    networkId: defaults.defaultNetworkId,
  });

  for (const token of parseTokenList(value.multiasset())) {
    multiToken.add({
      amount: new BigNumber(token.amount),
      identifier: token.assetId,
      networkId: defaults.defaultNetworkId,
    });
  }
  return multiToken;
}
