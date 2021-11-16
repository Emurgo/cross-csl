import { Axios } from 'axios';
import BigNumber from 'bignumber.js';
import { chunk, flatten } from '../internals/utils/js';
import { UtxoApiContract } from './api';

import { Asset, DiffPoint, DiffType, TipStatusReference, Utxo, UtxoApiResponse, UtxoApiResult, UtxoAtPointRequest, UtxoDiff, UtxoDiffItem, UtxoDiffItemOutput, UtxoDiffSincePointRequest } from "./models";

export type UtxoAtPointItemResponse = {
  utxo_id: string,
  tx_hash: string,
  tx_index: number,
  receiver: string,
  amount: string,
  assets: Asset[],
  block_num: number
};

export type UtxoDiffSincePointItemResponse = {
  type: DiffType
  id: string
  receiver: string
  amount: string
  assets: Asset[]
  block_num: number
  tx_hash: string,
  tx_index: number
};

export type UtxoDiffSincePointResponse = {
  lastDiffPointSelected: DiffPoint
  diffItems: UtxoDiffSincePointItemResponse[]
};

export type TipStatusResponse = {
  reference: {
    lastFoundSafeBlock: string
    lastFoundBestBlock: string
  }
}

export type GetTipStatusResponse = {
  safeBlock: string
  bestBlock: string
}

const handleReferencePointErrors = <T>(err: any): UtxoApiResponse<T> => {
  if (err.response && err.response.data && err.response.data.error && err.response.data.response) {
    const errResponse: string = err.response.data.response;
    switch (errResponse) {
      case 'REFERENCE_POINT_BLOCK_NOT_FOUND':
        return {
          result: UtxoApiResult.SAFEBLOCK_ROLLBACK
        }
      default: throw err;
    }
  } else {
    throw err;
  }
};

const handleReferencePointAndBestBlockErrors = <T>(err: any): UtxoApiResponse<T> => {
  if (err.response && err.response.data && err.response.data.error && err.response.data.response) {
    const errResponse: string = err.response.data.response;
    switch (errResponse) {
      case 'REFERENCE_BESTBLOCK_NOT_FOUND':
        return {
          result: UtxoApiResult.BESTBLOCK_ROLLBACK
        }
      case 'REFERENCE_POINT_BLOCK_NOT_FOUND':
        return {
          result: UtxoApiResult.SAFEBLOCK_ROLLBACK
        }
      default: throw err;
    }
  } else {
    throw err;
  }
};

export class BatchedEmurgoUtxoApi implements UtxoApiContract {
  private _base: UtxoApiContract;

  constructor(base: UtxoApiContract) {
    this._base = base;
  }

  async getSafeBlock(): Promise<string> {
    return await this._base.getSafeBlock();
  }

  async getBestBlock(): Promise<string> {
    return await this._base.getBestBlock();
  }

  async getTipStatusWithReference(bestBlocks: string[]): Promise<UtxoApiResponse<TipStatusReference>> {
    return await this._base.getTipStatusWithReference(bestBlocks);
  }

  async getUtxoAtPoint(req: UtxoAtPointRequest): Promise<UtxoApiResponse<Utxo[]>> {
    try {
      const addressChunks = chunk(req.addresses, 50);
      const promises = addressChunks.map(async (addresses) => await this._base.getUtxoAtPoint({
        referenceBlockHash: req.referenceBlockHash,
        addresses: addresses
      }));
      const values = (await Promise.all(promises)).map(x => x.value as Utxo[]);
      return {
        result: UtxoApiResult.SUCCESS,
        value: flatten(values)
      };
    } catch (err: any) {
      return handleReferencePointErrors(err);
    }
  }

  async getUtxoDiffSincePoint(req: UtxoDiffSincePointRequest): Promise<UtxoApiResponse<UtxoDiff>> {
    try {
      const addressChunks = chunk(req.addresses, 50);
      const promises = addressChunks.map(async (addresses) => await this._base.getUtxoDiffSincePoint({
        afterBestBlock: req.afterBestBlock,
        untilBlockHash: req.untilBlockHash,
        addresses: addresses
      }));
      const values = (await Promise.all(promises)).map(x => x.value as UtxoDiff);
      return {
        result: UtxoApiResult.SUCCESS,
        value: {
          diffItems: flatten(values.map(x => x.diffItems))
        }
      };
    } catch (err: any) {
      return handleReferencePointErrors(err);
    }
  }
}

export class EmurgoUtxoApi implements UtxoApiContract {
  private _axios: Axios;
  private _apiUrl: string;
  private _throwRequestErrors: boolean;

  constructor(axios: Axios, apiUrl: string, throwRequestErrors: boolean) {
    this._axios = axios;
    this._apiUrl = apiUrl;
    this._throwRequestErrors = throwRequestErrors;
  }

  async getSafeBlock(): Promise<string> {
    const url = `${this._apiUrl}v2/tipStatus`;
    const resp = await this._axios.get<GetTipStatusResponse>(url);
    return resp.data.safeBlock;
  }
  
  async getBestBlock(): Promise<string> {
    const url = `${this._apiUrl}v2/tipStatus`;
    const resp = await this._axios.get<GetTipStatusResponse>(url);
    return resp.data.bestBlock;
  }

  async getTipStatusWithReference(bestBlocks: string[]): Promise<UtxoApiResponse<TipStatusReference>> {
    try {
      const url = `${this._apiUrl}v2/tipStatus`;
      const resp = await this._axios.post<TipStatusResponse>(url, {
        reference: {
          bestBlocks: bestBlocks
        }
      });
      return {
        result: UtxoApiResult.SUCCESS,
        value: {
          reference: {
            lastFoundBestBlock: resp.data.reference.lastFoundBestBlock,
            lastFoundSafeBlock: resp.data.reference.lastFoundSafeBlock
          }
        }
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error && err.response.data.response) {
        const errResponse: string = err.response.data.response;
        switch (errResponse) {
          case 'REFERENCE_POINT_BLOCK_NOT_FOUND':
            return {
              result: UtxoApiResult.SAFEBLOCK_ROLLBACK
            }
          default: throw err;
        }
      } else {
        throw err;
      }
    }
  }

  async getUtxoAtPoint(req: UtxoAtPointRequest): Promise<UtxoApiResponse<Utxo[]>> {
    try {
      let page = 1;

      let allUtxos: UtxoAtPointItemResponse[] = [];
      let utxosAtPointPage = await this.getUtxoAtPointPage(req, page);
      allUtxos = allUtxos.concat(utxosAtPointPage);

      while (utxosAtPointPage.length > 0) {
        page++;
        utxosAtPointPage = await this.getUtxoAtPointPage(req, page);
        allUtxos = allUtxos.concat(utxosAtPointPage);
      }

      return {
        result: UtxoApiResult.SUCCESS,
        value: allUtxos.map(u => {
          return {
            utxoId: u.utxo_id,
            amount: new BigNumber(u.amount),
            assets: u.assets,
            blockNum: u.block_num,
            receiver: u.receiver,
            txHash: u.tx_hash,
            txIndex: u.tx_index
          }
        })
      }
    } catch (err: any) {
      if (this._throwRequestErrors) {
        throw err;
      }
      return handleReferencePointErrors(err);
    }
  }

  async getUtxoDiffSincePoint(req: UtxoDiffSincePointRequest): Promise<UtxoApiResponse<UtxoDiff>> {
    try {
      const url = `${this._apiUrl}v2/txs/utxoDiffSincePoint`;
      let response = await this._axios.post<UtxoDiffSincePointResponse>(url, {
        addresses: req.addresses,
        untilBlockHash: req.untilBlockHash,
        afterPoint: {
          blockHash: req.afterBestBlock
        },
        diffLimit: 10
      });

      let allDiffItems: UtxoDiffSincePointItemResponse[] = [];
      while (response.data.diffItems.length > 0) {
        allDiffItems = allDiffItems.concat(response.data.diffItems);
        response = await this._axios.post<UtxoDiffSincePointResponse>(url, {
          addresses: req.addresses,
          untilBlockHash: req.untilBlockHash,
          afterPoint: response.data.lastDiffPointSelected,
          diffLimit: 10
        });
      }

      return {
        result: UtxoApiResult.SUCCESS,
        value: {
          diffItems: allDiffItems.map(u => {
            if (u.type === DiffType.INPUT) {
              return {
                amount: new BigNumber(u.amount),
                id: u.id,
                type: u.type,
              } as UtxoDiffItem
            } else {
              return {
                amount: new BigNumber(u.amount),
                id: u.id,
                type: u.type,
                utxo: {
                  amount: new BigNumber(u.amount),
                  assets: u.assets,
                  blockNum: u.block_num,
                  receiver: u.receiver,
                  txHash: u.tx_hash,
                  txIndex: u.tx_index,
                  utxoId: u.id
                }
              } as UtxoDiffItemOutput
            }
          })
        }
      };
    } catch (err: any) {
      if (this._throwRequestErrors) {
        throw err;
      }
      return handleReferencePointAndBestBlockErrors(err);
    }
  }

  private async getUtxoAtPointPage(req: UtxoAtPointRequest, page: number): Promise<UtxoAtPointItemResponse[]> {
    const url = `${this._apiUrl}v2/txs/utxoAtPoint`;
    const resp = await this._axios.post<UtxoAtPointItemResponse[]>(url, {
      addresses: req.addresses,
      referenceBlockHash: req.referenceBlockHash,
      page: page,
      pageSize: 10
    });
    return resp.data;
  }
}