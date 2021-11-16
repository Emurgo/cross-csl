import BigNumber from "bignumber.js"

export enum UtxoApiResult {
  SUCCESS = 'SUCCESS',
  BESTBLOCK_ROLLBACK = 'BESTBLOCK_ROLLBACK',
  SAFEBLOCK_ROLLBACK = 'SAFEBLOCK_ROLLBACK'
}

export type Block = {
  number: number
  hash: string
  epochNo: number
  slotNo: number
}

export type UtxoAtPointRequest = {
  addresses: string[]
  referenceBlockHash: string
}

export type UtxoDiffSincePointRequest = {
  addresses: string[]
  untilBlockHash: string
  afterBestBlock: string
}

export type Asset = {
  assetId: string,
  policyId: string,
  name: string,
  amount: string,
}

export type Utxo = {
  utxoId: string
  txHash: string
  txIndex: number
  receiver: string
  amount: BigNumber
  assets: Asset[]
  blockNum: number
}

export enum DiffType {
  INPUT = 'input',
  OUTPUT = 'output',
}

export type UtxoDiffItem = {
  type: DiffType
  id: string
  amount: BigNumber
}

export type UtxoDiffItemOutput = UtxoDiffItem & {
  utxo: Utxo
}

export type DiffPoint = {
  blockHash: string
  txHash: string
  itemIndex: number
}

export type UtxoDiff = {
  diffItems: Array<UtxoDiffItem | UtxoDiffItemOutput>
}

export type UtxoDiffToBestBlock = {
  lastBestBlockHash: string
  spentUtxoIds: string[]
  newUtxos: Utxo[]
}

export type UtxoAtSafePoint = {
  lastSafeBlockHash: string
  utxos: Utxo[]
}

export type UtxoApiResponse<T> = {
  result: UtxoApiResult
  value?: T
}

export type TipStatusReference = {
  reference: {
    lastFoundSafeBlock: string
    lastFoundBestBlock: string
  }
}