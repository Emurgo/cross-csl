import { BigNumber } from 'bignumber.js';
import {
  DefaultTokenEntry,
  MultiToken,
  PRIMARY_ASSET_CONSTANTS,
  RemoteUnspentOutput,
  SendToken,
} from '../models';
import * as WasmContract from '../wasm-contract';
import { firstWithValue } from './index';

export async function cardanoValueFromMultiToken(
  wasm: WasmContract.WasmModuleProxy,
  tokens: MultiToken
): Promise<WasmContract.Value> {
  const value = await wasm.Value.new(
    await wasm.BigNum.fromStr(tokens.getDefaultEntry().amount.toString())
  );
  // recall: primary asset counts towards size
  if (tokens.size() === 1) return value;

  const assets = await wasm.MultiAsset.new();
  for (const entry of tokens.nonDefaultEntries()) {
    const { policyId, name } = await identifierToCardanoAsset(
      wasm,
      entry.identifier
    );

    const policyContent = firstWithValue(
      await assets.get(policyId),
      await wasm.Assets.new()
    );

    await policyContent.insert(
      name,
      await wasm.BigNum.fromStr(entry.amount.toString())
    );
    // recall: we always have to insert since WASM returns copies of objects
    assets.insert(policyId, policyContent);
  }
  if ((await assets.len()) > 0) {
    await value.setMultiasset(assets);
  }
  return value;
}

export async function multiTokenFromCardanoValue(
  value: WasmContract.Value,
  defaults: DefaultTokenEntry
): Promise<MultiToken> {
  const multiToken = new MultiToken([], defaults);
  const coin = await value.coin();
  multiToken.add({
    amount: new BigNumber(await coin.toStr()),
    identifier: defaults.defaultIdentifier,
    networkId: defaults.defaultNetworkId
  });

  for (const token of await parseTokenList(await value.multiasset())) {
    multiToken.add({
      amount: new BigNumber(token.amount),
      identifier: token.assetId,
      networkId: defaults.defaultNetworkId
    });
  }
  return multiToken;
}

export async function cardanoAssetToIdentifier(
  policyId: WasmContract.ScriptHash,
  name: WasmContract.AssetName
): Promise<string> {
  // note: possible for name to be empty causing a trailing hyphen
  return `${Buffer.from(await policyId.toBytes()).toString(
    'hex'
  )}.${Buffer.from(await name.name()).toString('hex')}`;
}

export async function identifierToCardanoAsset(
  wasm: WasmContract.WasmModuleProxy,
  identifier: string
): Promise<{
  policyId: WasmContract.ScriptHash;
  name: WasmContract.AssetName;
}> {
  const parts = identifier.split('.');
  return {
    policyId: await wasm.ScriptHash.fromBytes(Buffer.from(parts[0], 'hex')),
    name: await wasm.AssetName.new(Buffer.from(parts[1], 'hex'))
  };
}

export function buildSendTokenList(
  defaultToken: DefaultTokenEntry,
  tokens: SendToken[],
  utxos: Array<MultiToken>
): MultiToken {
  const amount = new MultiToken([], defaultToken);

  for (const token of tokens) {
    if (token.amount != null) {
      // if we add a specific amount of a specific token to the output, just add it
      amount.add({
        amount: new BigNumber(token.amount),
        identifier: token.token.identifier,
        networkId: token.token.networkId
      });
    } else if (token.token.isDefault) {
      // if we add a non-specific amount of the default token
      // sum amount values in the UTXO
      const relatedUtxoSum = utxos.reduce(
        (value, next) => value.plus(next.getDefaultEntry().amount),
        new BigNumber(0)
      );
      amount.add({
        amount: relatedUtxoSum,
        identifier: token.token.identifier,
        networkId: token.token.networkId
      });
    } else {
      // if we add a non-specific amount of a given token
      // sum up the value of all our UTXOs with this token
      const relatedUtxoSum = utxos.reduce((value, next) => {
        const assetEntry = next
          .nonDefaultEntries()
          .find((entry) => entry.identifier === token.token.identifier);
        if (assetEntry != null) {
          return value.plus(assetEntry.amount);
        }
        return value;
      }, new BigNumber(0));
      amount.add({
        amount: relatedUtxoSum,
        identifier: token.token.identifier,
        networkId: token.token.networkId
      });
    }
  }
  return amount;
}

export function multiTokenFromRemote(
  utxo: RemoteUnspentOutput,
  networkId: number
): MultiToken {
  const result = new MultiToken([], {
    defaultNetworkId: networkId,
    defaultIdentifier: PRIMARY_ASSET_CONSTANTS.Cardano
  });
  result.add({
    identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
    amount: new BigNumber(utxo.amount),
    networkId
  });
  for (const token of utxo.assets) {
    result.add({
      identifier: token.assetId,
      amount: new BigNumber(token.amount),
      networkId
    });
  }

  return result;
}

export function hasSendAllDefault(tokens: Array<SendToken>): boolean {
  const defaultSendAll = tokens.find((token) => {
    if (token.shouldSendAll === true && token.token.isDefault) return true;
    return false;
  });
  return defaultSendAll != null;
}

export async function parseTokenList(assets: WasmContract.MultiAsset): Promise<
  Array<{
    assetId: string;
    policyId: string;
    name: string;
    amount: string;
  }>
> {
  if (!assets.hasValue()) return [];

  const result = [];
  const hashes = await assets.keys();
  for (let i = 0; i < (await hashes.len()); i++) {
    const policyId = await hashes.get(i);
    const assetsForPolicy = await assets.get(policyId);
    if (!assetsForPolicy.hasValue()) continue;

    const policies = await assetsForPolicy.keys();
    for (let j = 0; j < (await policies.len()); j++) {
      const assetName = await policies.get(j);
      const amount = await assetsForPolicy.get(assetName);
      if (amount.hasValue()) continue;

      result.push({
        amount: await amount.toStr(),
        assetId: await cardanoAssetToIdentifier(policyId, assetName),
        policyId: Buffer.from(await policyId.toBytes()).toString('hex'),
        name: Buffer.from(await assetName.name()).toString('hex')
      });
    }
  }
  return result;
}
