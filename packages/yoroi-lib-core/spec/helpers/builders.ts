import BigNumber from 'bignumber.js'
import { blake2b } from 'hash-wasm'
import { Block, DiffType, Utxo, UtxoDiffItem, UtxoDiffItemOutput } from '../../src/utxo/models'

const generatedHashes: {[key: string]: boolean} = {}

export const random256Hash = async (): Promise<string> => {
  let hash: string
  do {
    hash = await blake2b(randomInt(1, 1000000).toString(), 256)
  } while (generatedHashes[hash])
  generatedHashes[hash] = true
  return hash
}

export const randomFakeAddress = async (): Promise<string> => {
  return `addr_${await random256Hash()}`
}

export const randomFakeAddresses = async (numberOfAddresses: number): Promise<string[]> => {
  const addresses: string[] = []
  for (let i = 0; i < numberOfAddresses; i++) {
    addresses.push(await randomFakeAddress())
  }
  return addresses
}

export const randomBlock = async (): Promise<Block> => {
  return {
    epochNo: randomInt(1, 300),
    hash: await random256Hash(),
    number: randomInt(1, 900),
    slotNo: randomInt(1, 300)
  }
}

export const randomBlockAfter = async (referenceBlock: Block, difference: number): Promise<Block> => {
  return {
    epochNo: referenceBlock.epochNo + difference,
    hash: await random256Hash(),
    number: referenceBlock.number + difference,
    slotNo: referenceBlock.slotNo + difference
  }
}

export const randomUtxo = async (receiver: string): Promise<Utxo> => {
  const txHash = await random256Hash()
  const txIndex = 0
  return {
    utxoId: `${txHash}:${txIndex}`,
    txHash: txHash,
    txIndex: txIndex,
    receiver: receiver,
    amount: new BigNumber(randomInt(1, 1000000000)),
    assets: [],
    blockNum: randomInt(1, 900)
  }
}

export const randomUtxos = async (quantityOfUtxos: number, receiver: string): Promise<Utxo[]> => {
  const utxos: Utxo[] = []
  for (let i = 0; i < quantityOfUtxos; i++) {
    utxos.push(await randomUtxo(receiver))
  }
  return utxos
}

export const randomUtxosForAddresses = async (quantityOfUtxos: number, receivers: string[]): Promise<Utxo[]> => {
  const utxos: Utxo[] = []
  for (let i = 0; i < quantityOfUtxos; i++) {
    utxos.push(await randomUtxo(receivers[randomInt(0, receivers.length - 1)]))
  }
  return utxos
}

export const randomUtxoDiffOutput = async (receiver: string): Promise<UtxoDiffItemOutput> => {
  const utxo = await randomUtxo(receiver)
  return {
    id: utxo.utxoId,
    amount: new BigNumber(randomInt(100, 1000000)),
    type: DiffType.OUTPUT,
    utxo: utxo
  }
}

export const randomUtxoDiffInput = async (sourceUtxoId: string): Promise<UtxoDiffItem> => {
  return {
    id: sourceUtxoId,
    amount: new BigNumber(randomInt(100, 1000000)),
    type: DiffType.INPUT,
  }
}

export const randomDiffs = async (quantity: number, receivers: string[]): Promise<UtxoDiffItem[]> => {
  const diffs: UtxoDiffItem[] = []
  for (let i = 0; i < quantity; i++) {
    const r = randomInt(0, 1)
    if (r === 0) {
      diffs.push(await randomUtxoDiffOutput(receivers[randomInt(0, receivers.length - 1)]))
    } else {
      diffs.push(await randomUtxoDiffInput(`${await random256Hash()}:${randomInt(0, 5)}`))
    }
  }
  return diffs
}

export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min
