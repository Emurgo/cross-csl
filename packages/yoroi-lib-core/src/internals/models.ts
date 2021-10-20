import { BigNumber } from 'bignumber.js';
import { MultiToken } from './multi-token';

export const PRIMARY_ASSET_CONSTANTS = {
  Cardano: '',
  Ergo: '',
  Jormungandr: ''
};

export type Transaction = {
  hash: string;
}

export type UtxoTransactionOutput = {
  outputIndex: number;
}

export type UtxoTxOutput = {
  transaction: Transaction;
  utxoTransactionOutput: UtxoTransactionOutput;
  tokens: Array<{
    tokenList: TokenList;
    token: Token;
  }>;
}

export type AddressingUtxo = AddressingAddress & {
  output: UtxoTxOutput;
}

export type CardanoAddressedUtxo = RemoteUnspentOutput & Addressing

export type Value = {
  values: MultiToken;
}

export type Change = AddressingAddress & Value

export type AddressingAddress = Address & Addressing

export type Address = {
  address: string;
}

export type Addressing = {
  addressing: {
    path: number[];
    startLevel: number;
  };
}

export type TxOutput = {
  address: string;
  amount: MultiToken;
}

export type RemoteUnspentOutput = {
  amount: string;
  receiver: string;
  txHash: string;
  txIndex: number;
  utxoId: string;
  assets: ReadonlyArray<UtxoAsset>;
}

export type UtxoAsset = {
  assetId: string;
  amount: string;
}

export type SendToken = {
  amount: BigNumber;
  token: Token;
  shouldSendAll: boolean;
}

export type TokenList = {
  amount: string;
}

export type Token = {
  identifier: string;
  networkId: number;
  isDefault: boolean;
}

export type DefaultTokenEntry = {
  defaultNetworkId: number;
  defaultIdentifier: string;
}

export type TokenEntry = {
  amount: BigNumber;
  identifier: string;
  networkId: number;
}

// This name will probably change
export type MultiTokenConstruct = {
  values: Array<TokenEntry>;
  defaults: DefaultTokenEntry;
}

export type TxOptions = {
  metadata?: ReadonlyArray<TxMetadata>;
}

export type TxMetadata = {
  label: string;
  data: any;
}

export type CardanoHaskellConfig = {
  keyDeposit: string;
  linearFee: LinearFee;
  minimumUtxoVal: string;
  poolDeposit: string;
  networkId: number;
}

export type LinearFee = {
  coefficient: string;
  constant: string;
}

export enum MetadataJsonSchema {
  NoConversions = 0,
  BasicConversions = 1,
  DetailedSchema = 2
}
