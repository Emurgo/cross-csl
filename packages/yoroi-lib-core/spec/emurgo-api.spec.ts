import * as sinon from 'ts-sinon';

import { Axios, AxiosResponse } from 'axios';

import { EmurgoUtxoApi, BatchedEmurgoUtxoApi, GetTipStatusResponse, TipStatusResponse, UtxoAtPointItemResponse, UtxoDiffSincePointResponse, UtxoDiffSincePointItemResponse } from '../src/utxo/emurgo-api';
import { random256Hash, randomDiffs, randomFakeAddresses, randomInt, randomUtxosForAddresses } from './helpers/builders';
import { expect } from 'chai';
import { DiffPoint, DiffType, Utxo, UtxoApiResult, UtxoDiffItem, UtxoDiffItemOutput } from '../src/utxo/models';
import { chunk } from '../src/internals/utils/js';

const fakeApiUrl = 'http://utxo.api.io/';

describe('UTxO API', () => {
  let axios: sinon.StubbedInstance<Axios>;
  let baseApi: EmurgoUtxoApi;

  beforeEach(() => {
    axios = sinon.stubInterface<Axios>();
    baseApi = new EmurgoUtxoApi(axios, fakeApiUrl, false);
  });

  it('should return best block and safe block hashes', async () => {
    // arrange
    const bestBlockHash = await random256Hash();
    const safeBlockHash = await random256Hash();

    axios.get
      .withArgs(`${fakeApiUrl}v2/tipStatus`)
      .returns(Promise.resolve({
        data: {
          bestBlock: bestBlockHash,
          safeBlock: safeBlockHash
        }
      } as AxiosResponse<GetTipStatusResponse>));

    // act
    const sut = new BatchedEmurgoUtxoApi(baseApi);
    const returnedBestBlock = await sut.getBestBlock();
    const returnedSafeBlock = await sut.getSafeBlock();

    // assert
    expect(returnedBestBlock).to.equal(bestBlockHash);
    expect(returnedSafeBlock).to.equal(safeBlockHash);
  });

  it('should return tip status with reference', async () => {
    // arrange
    const bestBlocks = [await random256Hash(), await random256Hash(), await random256Hash()];

    axios.post
      .withArgs(`${fakeApiUrl}v2/tipStatus`, {
        reference: {
          bestBlocks: bestBlocks
        }
      })
      .returns(Promise.resolve({
        data: {
          reference: {
            lastFoundBestBlock: bestBlocks[2],
            lastFoundSafeBlock: bestBlocks[0]
          }
        }
      } as AxiosResponse<TipStatusResponse>));
    
    // act
    const sut = new BatchedEmurgoUtxoApi(baseApi);
    const tipStatus = await sut.getTipStatusWithReference(bestBlocks);

    // assert
    expect(tipStatus.result).to.equal(UtxoApiResult.SUCCESS);
    expect(tipStatus.value?.reference.lastFoundBestBlock).to.equal(bestBlocks[2]);
    expect(tipStatus.value?.reference.lastFoundSafeBlock).to.equal(bestBlocks[0]);
  });

  it('should return UTxO at point', async () => {
    // arrange
    const addresses = await randomFakeAddresses(10);
    const referenceBlockHash = await random256Hash();
    const utxos = await randomUtxosForAddresses(20, addresses);

    setupUtxoAtPoint(addresses, referenceBlockHash, utxos);

    // act
    const sut = new BatchedEmurgoUtxoApi(baseApi);
    const returnedUtxos = await sut.getUtxoAtPoint({
      addresses: addresses,
      referenceBlockHash: referenceBlockHash
    });

    // assert
    expect(returnedUtxos.result).to.equal(UtxoApiResult.SUCCESS);
    expect(returnedUtxos.value?.length).to.eq(utxos.length);

    assertUtxoSets(unwrap(returnedUtxos.value), utxos);
  });

  it('should return UTxO at point with more than 50 addresses', async () => {
    // arrange
    const addresses = await randomFakeAddresses(100);
    const [firstBatch, secondBatch] = chunk(addresses, 50);
    const referenceBlockHash = await random256Hash();
    const utxosForFirstBatch = await randomUtxosForAddresses(20, firstBatch);
    const utxosForSecondBatch = await randomUtxosForAddresses(20, secondBatch);

    setupUtxoAtPoint(firstBatch, referenceBlockHash, utxosForFirstBatch);
    setupUtxoAtPoint(secondBatch, referenceBlockHash, utxosForSecondBatch);

    // act
    const sut = new BatchedEmurgoUtxoApi(baseApi);
    const returnedUtxos = await sut.getUtxoAtPoint({
      addresses: addresses,
      referenceBlockHash: referenceBlockHash
    });

    // assert
    const expectedUtxos = utxosForFirstBatch.concat(utxosForSecondBatch);
    expect(returnedUtxos.result).to.equal(UtxoApiResult.SUCCESS);
    expect(returnedUtxos.value?.length).to.eq(expectedUtxos.length);

    assertUtxoSets(unwrap(returnedUtxos.value), expectedUtxos);
  });

  it('should return diff', async () => {
    // arrange
    const addresses = await randomFakeAddresses(10);
    const untilBlockHash = await random256Hash();
    const afterBestBlock = await random256Hash();

    const expectedDiffs = await randomDiffs(20, addresses);

    await setupUtxoDiffSincePoint([expectedDiffs.slice(0, 10), expectedDiffs.slice(10, 20)], addresses, untilBlockHash, afterBestBlock);

    // act
    const sut = new BatchedEmurgoUtxoApi(baseApi);
    const diffsResponse = await sut.getUtxoDiffSincePoint({
      addresses: addresses,
      untilBlockHash: untilBlockHash,
      afterBestBlock: afterBestBlock
    });

    // assert
    expect(diffsResponse.result).to.equal(UtxoApiResult.SUCCESS);

    const diff = unwrap(diffsResponse.value);
    expect(diff.diffItems.length).to.equal(expectedDiffs.length);
    assertDiffs(diff.diffItems, expectedDiffs);
  });

  it('should return diff with more than 50 addresses', async () => {
    // arrange
    const addresses = await randomFakeAddresses(100);
    const untilBlockHash = await random256Hash();
    const afterBestBlock = await random256Hash();

    const [addressBatch1, addressBatch2] = chunk(addresses, 50);

    const diffsFromFirstBatch = await randomDiffs(20, addressBatch1);
    const diffsFromSecondBatch = await randomDiffs(20, addressBatch2);

    await setupUtxoDiffSincePoint(
      [diffsFromFirstBatch.slice(0, 10), diffsFromFirstBatch.slice(10, 20)],
      addressBatch1,
      untilBlockHash,
      afterBestBlock
    );
    await setupUtxoDiffSincePoint(
      [diffsFromSecondBatch.slice(0, 10), diffsFromSecondBatch.slice(10, 20)],
      addressBatch2,
      untilBlockHash,
      afterBestBlock
    );

    // act
    const sut = new BatchedEmurgoUtxoApi(baseApi);
    const diffsResponse = await sut.getUtxoDiffSincePoint({
      addresses: addresses,
      untilBlockHash: untilBlockHash,
      afterBestBlock: afterBestBlock
    });

    // assert
    const expectedDiffs = diffsFromFirstBatch.concat(diffsFromSecondBatch);
    expect(diffsResponse.result).to.equal(UtxoApiResult.SUCCESS);

    const diff = unwrap(diffsResponse.value);
    expect(diff.diffItems.length).to.equal(expectedDiffs.length);
    assertDiffs(diff.diffItems, expectedDiffs);
  });

  const setupUtxoDiffSincePoint = async (
    diffsSet: Array<UtxoDiffItem[]>,
    addresses: string[],
    untilBlockHash: string,
    afterBestBlock: string
  ) => {
    let afterPoint = {
      blockHash: afterBestBlock
    } as DiffPoint;

    for (const diff of diffsSet) {
      const lastDiffPointSelected = {
        blockHash: await random256Hash(),
        itemIndex: randomInt(0, 5),
        txHash: await random256Hash()
      } as DiffPoint;

      axios.post
        .withArgs(`${fakeApiUrl}v2/txs/utxoDiffSincePoint`, {
          addresses: addresses,
          untilBlockHash: untilBlockHash,
          afterPoint: afterPoint,
          diffLimit: 10
        })
        .returns(Promise.resolve({
          data: {
            lastDiffPointSelected: lastDiffPointSelected,
            diffItems: mapDiffToApiDiff(diff)
          }
        } as AxiosResponse<UtxoDiffSincePointResponse>));
      
      afterPoint = lastDiffPointSelected;
    }

    axios.post
        .withArgs(`${fakeApiUrl}v2/txs/utxoDiffSincePoint`, {
          addresses: addresses,
          untilBlockHash: untilBlockHash,
          afterPoint: afterPoint,
          diffLimit: 10
        })
        .returns(Promise.resolve({
          data: {
            lastDiffPointSelected: {
              blockHash: await random256Hash(),
              itemIndex: randomInt(0, 5),
              txHash: await random256Hash()
            },
            diffItems: [] as UtxoDiffSincePointItemResponse[]
          }
        } as AxiosResponse<UtxoDiffSincePointResponse>));
  }

  const assertDiffs = (diffItems: UtxoDiffItem[], expectedDiffs: UtxoDiffItem[]) => {
    for (const expectedDiffItem of expectedDiffs) {
      const diffItem = diffItems
        .find(d => d.id === expectedDiffItem.id && d.type === expectedDiffItem.type) as UtxoDiffItem;
      expect(diffItem).to.not.be.undefined;
      if (diffItem.type === DiffType.INPUT) {
        expect(diffItem.amount.toString()).to.equal(expectedDiffItem.amount.toString());
        expect(diffItem.type).to.equal(expectedDiffItem.type);
        expect(diffItem.id).to.equal(expectedDiffItem.id);
      } else {
        const diffItemOutput = diffItem as UtxoDiffItemOutput;
        const expectedDiffItemOutput = expectedDiffItem as UtxoDiffItemOutput;
        expect(diffItemOutput.amount.toString()).to.equal(expectedDiffItemOutput.amount.toString());
        expect(diffItemOutput.type).to.equal(expectedDiffItemOutput.type);
        expect(diffItemOutput.id).to.equal(expectedDiffItemOutput.id);

        // we generate random UTxOs for practicity.
        // the amount of the UTxO is mapped from the diff item, that's why only for this
        // field we compare the UTxO with the diff item directly
        expect(diffItemOutput.utxo.amount.toString()).to.equal(expectedDiffItemOutput.amount.toString());
        expect(diffItemOutput.utxo.assets).to.eq(expectedDiffItemOutput.utxo.assets);
        expect(diffItemOutput.utxo.blockNum).to.equal(expectedDiffItemOutput.utxo.blockNum);
        expect(diffItemOutput.utxo.receiver).to.equal(expectedDiffItemOutput.utxo.receiver);
        expect(diffItemOutput.utxo.txHash).to.equal(expectedDiffItemOutput.utxo.txHash);
        expect(diffItemOutput.utxo.txIndex).to.equal(expectedDiffItemOutput.utxo.txIndex);
        expect(diffItemOutput.utxo.utxoId).to.equal(expectedDiffItemOutput.utxo.utxoId);
      }
    }
  }

  const mapDiffToApiDiff = (arr: UtxoDiffItem[]): UtxoDiffSincePointItemResponse[] => {
    return arr.map(x => {
      if (x.type === DiffType.OUTPUT) {
        const diffOut = x as UtxoDiffItemOutput;
        return {
          amount: diffOut.amount.toString(),
          assets: diffOut.utxo.assets,
          block_num: diffOut.utxo.blockNum,
          receiver: diffOut.utxo.receiver,
          tx_hash: diffOut.utxo.txHash,
          tx_index: diffOut.utxo.txIndex,
          type: DiffType.OUTPUT,
          id: diffOut.utxo.utxoId
        } as UtxoDiffSincePointItemResponse;
      } else {
        return {
          amount: x.amount.toString(),
          type: DiffType.INPUT,
          id: x.id
        } as UtxoDiffSincePointItemResponse;
      }
    });
  }

  const setupUtxoAtPoint = (
    addresses: string[],
    referenceBlockHash: string,
    utxos: Utxo[]
  ) => {
    const pageSize = 10;
    const chunks = chunk(utxos, 10).concat([[]]);
    for (let page = 1; page <= chunks.length; page++) {
      const chunk = chunks[page - 1];
      axios.post
        .withArgs(`${fakeApiUrl}v2/txs/utxoAtPoint`, {
          addresses: addresses,
          referenceBlockHash: referenceBlockHash,
          page: page,
          pageSize: pageSize
        })
        .returns(Promise.resolve({
          data: mapUtxoToApiUtxo(chunk)
        } as AxiosResponse<UtxoAtPointItemResponse[]>));
    }
  }

  const assertUtxoSets = (actual: Utxo[], expected: Utxo[]) => {
    for (const expectedItem of expected) {
      const actualItem = actual.find(x => x.utxoId === expectedItem.utxoId);
      expect(actualItem).to.not.be.undefined;
      expect(actualItem?.amount.toString()).to.eq(expectedItem.amount.toString());
      expect(actualItem?.assets).to.eq(expectedItem.assets);
      expect(actualItem?.blockNum).to.eq(expectedItem.blockNum);
      expect(actualItem?.receiver).to.eq(expectedItem.receiver);
      expect(actualItem?.txHash).to.eq(expectedItem.txHash);
      expect(actualItem?.txIndex).to.eq(expectedItem.txIndex);
      expect(actualItem?.utxoId).to.eq(expectedItem.utxoId);
    }
  }

  const unwrap = <T>(v?: T): T => {
    return v as T;
  }

  const mapUtxoToApiUtxo = (arr: Utxo[]): UtxoAtPointItemResponse[] => {
    return arr.map(u => {
      return {
        amount: u.amount.toString(),
        assets: u.assets,
        block_num: u.blockNum,
        receiver: u.receiver,
        tx_hash: u.txHash,
        tx_index: u.txIndex,
        utxo_id: u.utxoId
      } as UtxoAtPointItemResponse;
    })
  };
});