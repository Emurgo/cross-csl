import { BigNumber } from 'bignumber.js'
import { MultiToken } from './multi-token'

interface Bip44DerivationLevel {
  level: number
}

export type AmountWithReceiver = {
  receiver: string
  amount: string
}
export type StakingKeyBalances = {[key: string]: string}

export enum RegistrationStatus {
  DelegateOnly,
  RegisterAndDelegate,
  Deregister
}

export const Bip44DerivationLevels = {
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

export const PRIMARY_ASSET_CONSTANTS = {
  Cardano: '',
  Ergo: '',
  Jormungandr: ''
}

export type AccountStatePart = {
  remainingAmount: string
  rewards: string
  withdrawals: string
}

export type WithdrawalRequest = {
  addressing: Addressing
  rewardAddress: string
  shouldDeregister: boolean
}

export type Transaction = {
  hash: string
}

export type Utxo = {
  transaction: Transaction
  index: number
  tokens: Array<{
    amount: string
    token: Token
  }>
}

export type CardanoAddressedUtxo = RemoteUnspentOutput & {
  addressing: Addressing
}

export type Change = AddressingAddress & {
  values: MultiToken
}

export type AddressingAddress = {
  address: Address
  addressing: Addressing
}

export type Address = string

export type Addressing = {
  path: number[]
  startLevel: number
}

export type TxOutput = {
  address: string
  amount: MultiToken
}

export type RemoteUnspentOutput = {
  amount: string
  receiver: string
  txHash: string
  txIndex: number
  utxoId: string
  assets: ReadonlyArray<UtxoAsset>
}

export type UtxoAsset = {
  assetId: string
  amount: string
}

export type SendToken = {
  amount: BigNumber
  token: Token
  shouldSendAll: boolean
}

export type Token = {
  identifier: string
  networkId: number
  isDefault: boolean
}

export type TokenEntry = {
  amount: BigNumber
  identifier: string
  networkId: number
}

export type MultiTokenValue = {
  values: Array<TokenEntry>
  defaults: Token
}

export type TxOptions = {
  metadata?: ReadonlyArray<TxMetadata>
}

export type TxMetadata = {
  label: string
  data: any
}

export type CardanoHaskellConfig = {
  keyDeposit: string
  linearFee: LinearFee
  minimumUtxoVal: string
  poolDeposit: string
  networkId: number
}

export type LinearFee = {
  coefficient: string
  constant: string
}

export enum MetadataJsonSchema {
  NoConversions = 0,
  BasicConversions = 1,
  DetailedSchema = 2
}

export enum CatalystLabels {
  DATA = 61284,
  SIG = 61285
}

export enum CoinType {
  CARDANO = 2147485463, // HARD_DERIVATION_START + 1815;
  ERGO = 2147484077, // HARD_DERIVATION_START + 429;
}
