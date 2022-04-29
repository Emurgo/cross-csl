import * as WasmContract from '../wasm-contract'
import {
  AddressingAddress,
  AddressingUtxo,
  CardanoAddressedUtxo,
  PRIMARY_ASSET_CONSTANTS,
  RemoteUnspentOutput
} from '../models'
import { normalizeToAddress } from './addresses'
import { AddInputResult } from './index'
import { identifierToCardanoAsset, multiTokenFromCardanoValue } from './assets'
import { BigNumber } from 'bignumber.js'

export async function minRequiredForChange(
  wasm: WasmContract.WasmModuleProxy,
  txBuilder: WasmContract.TransactionBuilder,
  changeAdaAddr: AddressingAddress,
  value: WasmContract.Value,
  protocolParams: {
    linearFee: WasmContract.LinearFee
    minimumUtxoVal: WasmContract.BigNum
  }
): Promise<WasmContract.BigNum> {
  const wasmChange = await normalizeToAddress(wasm, changeAdaAddr.address)
  if (!wasmChange?.hasValue()) {
    throw new Error(`minRequiredForChange: change not a valid Shelley address`)
  }
  const minimumAda = await wasm.minAdaRequired(
    value,
    protocolParams.minimumUtxoVal
  )

  // we may have to increase the value used up to the minimum ADA required
  const baseValue = (async () => {
    const coin = await value.coin()
    if ((await coin.compare(minimumAda)) < 0) {
      const newVal = await wasm.Value.new(minimumAda)
      const assets = await value.multiasset()
      if (assets.hasValue()) {
        await newVal.setMultiasset(assets)
      }
      return newVal
    }
    return value
  })()
  const minRequired = await txBuilder
    .feeForOutput(await wasm.TransactionOutput.new(wasmChange, await baseValue))
    .then((x) => x.checkedAdd(minimumAda))
  return minRequired
}

export async function addUtxoInput(
  wasm: WasmContract.WasmModuleProxy,
  txBuilder: WasmContract.TransactionBuilder,
  remaining:
    | {
        hasInput: boolean // every tx requires at least one input
        value: WasmContract.Value
      }
    | undefined,
  input: RemoteUnspentOutput,
  /* don't add the input if the amount is smaller than the fee to add it to the tx */
  excludeIfSmall: boolean,
  protocolParams: {
    networkId: number
  }
): Promise<AddInputResult> {
  const wasmAddr = await normalizeToAddress(wasm, input.receiver)
  if (!wasmAddr?.hasValue()) {
    throw new Error(`addUtxoInput input not a valid Shelley address`)
  }
  const txInput = await utxoToTxInput(wasm, input)
  const wasmAmount = await cardanoValueFromRemoteFormat(wasm, input)

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
      .then(async (x) => x.checkedAdd(await txBuilder.getImplicitInput()))
    try {
      await currentInputSum.checkedAdd(wasmAmount)
    } catch (e) {
      return AddInputResult.OVERFLOW
    }
    return AddInputResult.VALID
  }

  const skipInput = async (): Promise<AddInputResult> => {
    if (!remaining) return skipOverflow()

    const defaultEntry = {
      networkId: protocolParams.networkId,
      identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
      isDefault: true
    }
    const tokenSetInInput = new Set(input.assets.map((asset) => asset.assetId))
    const remainingTokens = await multiTokenFromCardanoValue(
      remaining.value,
      defaultEntry
    )
    const includedTargets = remainingTokens
      .nonDefaultEntries()
      .filter((entry) => tokenSetInInput.has(entry.identifier))

    if (
      remainingTokens.getDefaultEntry().amount.gt(0) &&
      new BigNumber(input.amount).gt(0)
    ) {
      includedTargets.push(remainingTokens.getDefaultEntry())
    }

    // it's possible to have no target left and yet have no input added yet
    // due to refunds in Cardano
    // so we still want to add the input in this case even if we don't care about the coins in it
    if (includedTargets.length === 0 && remaining.hasInput) {
      return AddInputResult.NO_NEED
    }

    const onlyDefaultEntry =
      includedTargets.length === 1 &&
      includedTargets[0].identifier === defaultEntry.identifier
    // ignore UTXO that contribute less than their fee if they also don't contribute a token
    if (onlyDefaultEntry && excludeIfSmall) {
      const feeForInput = new BigNumber(
        await (
          await txBuilder.feeForInput(wasmAddr, txInput, wasmAmount)
        ).toStr()
      )
      if (feeForInput.gt(input.amount)) {
        return AddInputResult.TOO_SMALL
      }
    }

    return skipOverflow()
  }

  const skipResult = await skipInput()
  if (skipResult !== AddInputResult.VALID) {
    return skipResult
  }

  await txBuilder.addInput(wasmAddr, txInput, wasmAmount)
  return AddInputResult.VALID
}

export async function cardanoValueFromRemoteFormat(
  wasm: WasmContract.WasmModuleProxy,
  utxo: RemoteUnspentOutput
): Promise<WasmContract.Value> {
  const value = await wasm.Value.new(await wasm.BigNum.fromStr(utxo.amount))
  if (utxo.assets.length === 0) return value

  const assets = await wasm.MultiAsset.new()
  for (const entry of utxo.assets) {
    const { policyId, name } = await identifierToCardanoAsset(
      wasm,
      entry.assetId
    )

    let policyContent = await assets.get(policyId)
    if (!policyContent.hasValue()) {
      policyContent = await wasm.Assets.new()
    }

    await policyContent.insert(
      name,
      await wasm.BigNum.fromStr(entry.amount.toString())
    )
    // recall: we always have to insert since WASM returns copies of objects
    await assets.insert(policyId, policyContent)
  }
  if ((await assets.len()) > 0) {
    await value.setMultiasset(assets)
  }
  return value
}

export async function asAddressedUtxo(
  wasm: WasmContract.WasmModuleProxy,
  utxos: Array<AddressingUtxo>
): Promise<Array<CardanoAddressedUtxo>> {
  return await Promise.all(
    utxos.map(async (utxo) => {
      const tokenTypes = utxo.output.tokens.reduce(
        (acc, next) => {
          if (next.token.identifier === PRIMARY_ASSET_CONSTANTS.Cardano) {
            acc.amount = acc.amount.plus(next.tokenList.amount)
          } else {
            acc.tokens.push({
              amount: next.tokenList.amount,
              tokenId: next.token.identifier
            })
          }
          return acc
        },
        {
          amount: new BigNumber(0),
          tokens: [] as { amount: string; tokenId: string }[]
        }
      )

      const assets = await Promise.all(
        tokenTypes.tokens.map(async (token) => {
          const pieces = await identifierToCardanoAsset(wasm, token.tokenId)
          return {
            amount: token.amount,
            assetId: token.tokenId,
            policyId: Buffer.from(await pieces.policyId.toBytes()).toString(
              'hex'
            ),
            name: Buffer.from(await pieces.name.name()).toString('hex')
          }
        })
      )

      return {
        amount: tokenTypes.amount.toString(),
        receiver: utxo.address,
        txHash: utxo.output.transaction.hash,
        txIndex: utxo.output.index,
        utxoId:
          utxo.output.transaction.hash +
          utxo.output.index,
        addressing: utxo.addressing,
        assets
      }
    })
  )
}

async function utxoToTxInput(
  wasm: WasmContract.WasmModuleProxy,
  utxo: RemoteUnspentOutput
): Promise<WasmContract.TransactionInput> {
  return await wasm.TransactionInput.new(
    await wasm.TransactionHash.fromBytes(Buffer.from(utxo.txHash, 'hex')),
    utxo.txIndex
  )
}

export async function isBigNumZero(
  wasm: WasmContract.WasmModuleProxy,
  b: WasmContract.BigNum
): Promise<boolean> {
  return (await b.compare(await wasm.BigNum.fromStr('0'))) === 0
}
