import { BigNumber } from 'bignumber.js';

export const PRIMARY_ASSET_CONSTANTS = {
  Cardano: '',
  Ergo: '',
  Jormungandr: ''
};

export interface AddressingAddress extends Address, Addressing {
  
}

export interface Address {
  address: string
}

export interface Addressing {

}

export interface TxOutput {
  address: string
  amount: MultiToken
}

export interface RemoteUnspentOutput {
  amount: string
  receiver: string
  txHash: string
  txIndex: number
  assets: ReadonlyArray<UtxoAsset>
}

export interface DefaultTokenEntry {
  defaultNetworkId: number
  defaultIdentifier: string
};

export interface UtxoAsset {
  assetId: string
  amount: string
}

export interface MultiToken {
  getDefaultEntry(): TokenEntry
  size(): number
  nonDefaultEntries(): TokenEntry[]
}

export interface TokenEntry {
  amount: BigNumber
  identifier: string
}

export interface TxOptions {
  receiver: string;
  sendAll: boolean;
  metadata?: ReadonlyArray<TxMetadata>;
}

export interface TxMetadata {
  label: string;
  data: any;
}

export interface CardanoHaskellConfig {
  keyDeposit: string;
  linearFee: LinearFee;
  minimumUtxoVal: string;
  poolDeposit: string;
  networkId: string;
}

export interface LinearFee {
  coefficient: string;
  constant: string;
}

export enum MetadataJsonSchema {
  NoConversions = 0,
  BasicConversions = 1,
  DetailedSchema = 2
}
