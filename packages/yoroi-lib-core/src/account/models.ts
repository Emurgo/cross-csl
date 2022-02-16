// MODELS
export enum EmurgoApiResult {
  SUCCESS = 'SUCCESS'
}

export type AccountApiResponse<T> = {
  result: EmurgoApiResult
  data?: T
}

export type AddressPath = {
  account: number
  chain: number
  addressIndex: number
}

export type AddressRecord = Pick<
  AddressPath,
  'account' | 'chain' | 'addressIndex'
> & {
  address: string
  hash: string
  firstBlock: number
}

// API
export type AddressesUsedApiRequest = Readonly<{
  addresses: string[]
}>

export type AddressesUsedApiResponse = Array<string>

export interface AccountApi {
  getAddressesUsed(
    req: AddressesUsedApiRequest
  ): Promise<AccountApiResponse<string[]>>
}

export type AccountApiConfig = Readonly<{
  url: string
  maxAddressesPerRequest: number
}>

// STORAGE
export interface AccountStorage {
  readAccounts(): Promise<AddressRecord[]>
  saveAccounts(addresses: AddressRecord[]): Promise<boolean>
}

// PROTOCOL
export interface AccountChainProtocolRecord {
  readonly gapLimit: number
  readonly bufferSize: number
  readonly queryUsedBy: 'none' | 'hash' | 'address'
  derive: (path: AddressPath) => Promise<AddressRecord>
}
export type AccountChainProtocols = Map<number, AccountChainProtocolRecord>
