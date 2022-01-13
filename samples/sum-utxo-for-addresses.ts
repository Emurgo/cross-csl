/**
 * This sample generates a private key from a BIP 39 mnemonic and then derives
 * `n` internal and external addresses, `n` being the value of `derivationDepth`,
 * and then fetches all UTxOs for these addresses and sum their values at the end
 */

import * as path from 'path'

import BigNumber from 'bignumber.js'
import { mnemonicToEntropy } from 'bip39'

import {
  Bip32PrivateKey
} from '@emurgo/yoroi-lib-core/dist/internals/wasm-contract'
import { init as initUtxo } from '@emurgo/yoroi-lib-core/dist/utxo'
import { JsonUtxoStorage } from './shared/json-storage'

import { init } from '@emurgo/yoroi-lib-nodejs'

enum AddressType {
  EXTERNAL = 0,
  INTERNAL = 1
}

const safePointPath = path.join(__dirname, '__storage__', 'safe-point.json')
const diffPath = path.join(__dirname, '__storage__', 'diff.json')

const utxoService = initUtxo(new JsonUtxoStorage(safePointPath, diffPath), 'http://localhost:8082/')

const harden = (num: number) => {
  return 0x80000000 + num
}

const yoroiLib = init()

const mnemonic = ''
const entropy = mnemonicToEntropy(mnemonic)

const derivationDepth = 50

const generateAddress = async (
  accountKey: Bip32PrivateKey,
  derivationLevel: number,
  addressType: AddressType
): Promise<string> => {
  const utxoPubKey = await accountKey
    .derive(addressType)
    .then(x => x.derive(derivationLevel))
    .then(x => x.toPublic())

  const stakeKey = await accountKey
    .derive(2)
    .then(x => x.derive(0))
    .then(x => x.toPublic())

  const baseAddress = await yoroiLib.Wasm.BaseAddress.new(
    await yoroiLib.Wasm.NetworkInfo.testnet().then(x => x.networkId()),
    await yoroiLib.Wasm.StakeCredential.fromKeyhash(await utxoPubKey.toRawKey().then(x => x.hash())),
    await yoroiLib.Wasm.StakeCredential.fromKeyhash(await stakeKey.toRawKey().then(x => x.hash()))
  )

  return await baseAddress.toAddress().then(x => x.toBech32())
}

(async () => {
  const rootKey = await yoroiLib.Wasm.Bip32PrivateKey.fromBip39Entropy(
    Buffer.from(entropy, 'hex'),
    Buffer.from('')
  )

  const accountKey = await rootKey
    .derive(harden(1852))
    .then(x => x.derive(harden(1815)))
    .then(x => x.derive(harden(0)))

  const externalAddresses: string[] = []
  for (let i = 0; i < derivationDepth; i++) {
    externalAddresses.push(await generateAddress(accountKey, i, AddressType.EXTERNAL))
  }

  const internalAddresses: string[] = []
  for (let i = 0; i < derivationDepth; i++) {
    internalAddresses.push(await generateAddress(accountKey, i, AddressType.INTERNAL))
  }

  const addresses = externalAddresses.concat(internalAddresses)
  await utxoService.syncUtxoState(addresses)
  const utxos = await utxoService.getAvailableUtxos()
  const sum = utxos.reduce((prev, curr) => {
    return prev.plus(curr.amount)
  }, new BigNumber('0'))
  
  console.log(`Total Lovelace: ${sum}`)
})()
