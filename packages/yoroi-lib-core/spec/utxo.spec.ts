import { expect } from 'chai'
import * as sinon from 'ts-sinon'
import { flatten } from '../src/internals/utils/js'

import { UtxoService, UtxoStorage } from '../src/utxo'
import { UtxoApiContract } from '../src/utxo/api'
import { UtxoDiff, UtxoDiffItemOutput, UtxoAtSafePoint, UtxoDiffToBestBlock, Utxo, UtxoApiResult } from '../src/utxo/models'
import { random256Hash, randomBlock, randomBlockAfter, randomFakeAddress, randomUtxo, randomUtxoDiffInput, randomUtxoDiffOutput } from './helpers/builders'

describe('UTxO', () => {
  let api: sinon.StubbedInstance<UtxoApiContract>
  let utxoStorage: sinon.StubbedInstance<UtxoStorage>

  beforeEach(() => {
    api = sinon.stubInterface<UtxoApiContract>()
    utxoStorage = sinon.stubInterface<UtxoStorage>()
  })

  describe('from clean state', () => {
    it('should perform sync', async () => {
      // arrange
      const addresses = [
        await randomFakeAddress()
      ]
      const safeBlock = await randomBlock()
  
      api.getSafeBlock
        .returns(Promise.resolve(safeBlock.hash))
  
      const utxos = [
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0])
      ]
  
      api.getUtxoAtPoint
        .withArgs({
          addresses: addresses,
          referenceBlockHash: safeBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxos
        }))
      
      const utxoDiff: UtxoDiff = {
        diffItems: [
          await randomUtxoDiffOutput(addresses[0]),
          await randomUtxoDiffInput(utxos[2].utxoId)
        ]
      }

      const bestBlock = await randomBlockAfter(safeBlock, 10)

      api.getBestBlock
        .returns(Promise.resolve(bestBlock.hash))

      api.getTipStatusWithReference
        .withArgs([safeBlock.hash])
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: {
            reference: {
              lastFoundBestBlock: safeBlock.hash,
              lastFoundSafeBlock: safeBlock.hash
            }
          }
        }))
  
      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: safeBlock.hash,
          untilBlockHash: bestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxoDiff
        }))
  
      // act
      const sut = new UtxoService(api, utxoStorage)
      await sut.syncUtxoState(addresses)
  
      // assert
      sinon.default.assert.called(utxoStorage.replaceUtxoAtSafePoint.withArgs(utxos, safeBlock.hash))
      sinon.default.assert.called(utxoStorage.appendUtxoDiffToBestBlock.withArgs({
        lastBestBlockHash: bestBlock.hash,
        spentUtxoIds: [utxoDiff.diffItems[1].id],
        newUtxos: [
          (utxoDiff.diffItems[0] as UtxoDiffItemOutput).utxo
        ]
      }))
    })
  })

  describe('state with safe UTxOs and diffs', () => {
    it('should merge into safe state on sync', async () => {
      // arrange
      const addresses = [
        await randomFakeAddress()
      ]
  
      const storedSafeBlock = await randomBlock()
  
      const safeUtxos = [
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0])
      ]
  
      const localSafePoint: UtxoAtSafePoint = {
        lastSafeBlockHash: storedSafeBlock.hash,
        utxos: safeUtxos
      }
  
      utxoStorage.getUtxoAtSafePoint
        .returns(Promise.resolve(localSafePoint))

      const storedBestBlock = await randomBlockAfter(storedSafeBlock, 10)
      const localDiff: UtxoDiffToBestBlock = {
        lastBestBlockHash: storedBestBlock.hash,
        spentUtxoIds: [safeUtxos[1].utxoId],
        newUtxos: [
          (await randomUtxoDiffOutput(addresses[0])).utxo,
        ]
      }

      utxoStorage.getUtxoDiffToBestBlock
        .returns(Promise.resolve([localDiff]))
  
      const bestBlock = await randomBlockAfter(storedBestBlock, 10)
      api.getBestBlock
        .returns(Promise.resolve(bestBlock.hash))

      const utxoDiff: UtxoDiff = {
        diffItems: [ ],
      }

      api.getTipStatusWithReference
        .withArgs([storedSafeBlock.hash, localDiff.lastBestBlockHash])
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: {
            reference: {
              lastFoundBestBlock: localDiff.lastBestBlockHash,
              lastFoundSafeBlock: localDiff.lastBestBlockHash
            }
          }
        }))

      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: localDiff.lastBestBlockHash,
          untilBlockHash: bestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxoDiff
        }))
  
      // act
      const sut = new UtxoService(api, utxoStorage)
      await sut.syncUtxoState(addresses)
  
      // assert
      const newSafeUtxos: Utxo[] = [
        safeUtxos[0],
        safeUtxos[2],
        localDiff.newUtxos[0]
      ]

      sinon.default.assert.calledOnce(utxoStorage.replaceUtxoAtSafePoint)
      sinon.default.assert.called(utxoStorage.replaceUtxoAtSafePoint.withArgs(newSafeUtxos, localDiff.lastBestBlockHash))
      sinon.default.assert.called(utxoStorage.appendUtxoDiffToBestBlock.withArgs({
        lastBestBlockHash: bestBlock.hash,
        spentUtxoIds: [],
        newUtxos: []
      }))
      sinon.default.assert.called(utxoStorage.removeDiffWithBestBlock.withArgs(localDiff.lastBestBlockHash))
    })

    it('should remove diffs from invalidated best blocks', async () => {
      // arrange
      const addresses = [
        await randomFakeAddress()
      ]
  
      const storedSafeBlock = await randomBlock()
  
      const safeUtxos = [
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0])
      ]
  
      const localSafePoint: UtxoAtSafePoint = {
        lastSafeBlockHash: storedSafeBlock.hash,
        utxos: safeUtxos
      }
  
      utxoStorage.getUtxoAtSafePoint
        .returns(Promise.resolve(localSafePoint))

      const storedBestBlock = await randomBlockAfter(storedSafeBlock, 10)
      const localDiff1: UtxoDiffToBestBlock = {
        lastBestBlockHash: storedBestBlock.hash,
        spentUtxoIds: [safeUtxos[1].utxoId],
        newUtxos: [
          (await randomUtxoDiffOutput(addresses[0])).utxo,
        ]
      }

      const localDiff2: UtxoDiffToBestBlock = {
        lastBestBlockHash: storedBestBlock.hash,
        spentUtxoIds: [],
        newUtxos: [
          (await randomUtxoDiffOutput(addresses[0])).utxo,
        ]
      }

      const localDiff3: UtxoDiffToBestBlock = {
        lastBestBlockHash: storedBestBlock.hash,
        spentUtxoIds: [],
        newUtxos: [
          (await randomUtxoDiffOutput(addresses[0])).utxo,
        ]
      }

      utxoStorage.getUtxoDiffToBestBlock
        .returns(Promise.resolve([localDiff1, localDiff2, localDiff3]))
  
      const bestBlock = await randomBlockAfter(storedBestBlock, 10)
      api.getBestBlock
        .returns(Promise.resolve(bestBlock.hash))

      const utxoDiff: UtxoDiff = {
        diffItems: [ ],
      }

      api.getTipStatusWithReference
        .withArgs([
          storedSafeBlock.hash,
          localDiff1.lastBestBlockHash,
          localDiff2.lastBestBlockHash,
          localDiff3.lastBestBlockHash
        ])
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: {
            reference: {
              lastFoundBestBlock: localDiff1.lastBestBlockHash,
              lastFoundSafeBlock: storedSafeBlock.hash
            }
          }
        }))

      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: localDiff1.lastBestBlockHash,
          untilBlockHash: bestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxoDiff
        }))
  
      // act
      const sut = new UtxoService(api, utxoStorage)
      await sut.syncUtxoState(addresses)
  
      // assert
      sinon.default.assert.called(utxoStorage.removeDiffWithBestBlock.withArgs(localDiff2.lastBestBlockHash))
      sinon.default.assert.called(utxoStorage.removeDiffWithBestBlock.withArgs(localDiff3.lastBestBlockHash))
    })
  })

  describe('handle error responses', () => {
    it('should handle when bestblock gets invalidated', async () => {
      // arrange
      const addresses = [
        await randomFakeAddress()
      ]
      const safeBlock = await randomBlock()
  
      api.getSafeBlock
        .returns(Promise.resolve(safeBlock.hash))
  
      const utxos = [
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0])
      ]
  
      api.getUtxoAtPoint
        .withArgs({
          addresses: addresses,
          referenceBlockHash: safeBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxos
        }))
  
      const badBestBlock = await randomBlockAfter(safeBlock, 10)
      const goodBestBlock = await randomBlockAfter(safeBlock, 10)
      const bestBlockSequence = [badBestBlock.hash, goodBestBlock.hash].reverse()
      api.getBestBlock
        .callsFake(() => {
          return Promise.resolve(bestBlockSequence.pop() as string)
        })
      
      const utxoDiff: UtxoDiff = {
        diffItems: [
          await randomUtxoDiffOutput(addresses[0]),
          await randomUtxoDiffInput(utxos[2].utxoId)
        ],
      }

      api.getTipStatusWithReference
        .withArgs([
          safeBlock.hash
        ])
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: {
            reference: {
              lastFoundBestBlock: safeBlock.hash,
              lastFoundSafeBlock: safeBlock.hash
            }
          }
        }))
  
      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: safeBlock.hash,
          untilBlockHash: badBestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.BESTBLOCK_ROLLBACK
        }))

      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: safeBlock.hash,
          untilBlockHash: goodBestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxoDiff
        }))
  
      // act
      const sut = new UtxoService(api, utxoStorage)
      await sut.syncUtxoState(addresses)
  
      // assert
      sinon.default.assert.called(utxoStorage.replaceUtxoAtSafePoint.withArgs(utxos, safeBlock.hash))
      sinon.default.assert.called(utxoStorage.appendUtxoDiffToBestBlock.withArgs({
        lastBestBlockHash: goodBestBlock.hash,
        spentUtxoIds: [utxoDiff.diffItems[1].id],
        newUtxos: [
          (utxoDiff.diffItems[0] as UtxoDiffItemOutput).utxo
        ]
      }))
    })

    it('should handle when safeblock gets invalidated through tip status', async () => {
      // arrange
      const addresses = [
        await randomFakeAddress()
      ]

      const badSafeBlock = await randomBlock()
      const goodSafeBlock = await randomBlock()
      const safeBlockSequence = [badSafeBlock.hash, goodSafeBlock.hash].reverse()
      api.getSafeBlock
        .callsFake(() => {
          return Promise.resolve(safeBlockSequence.pop() as string)
        })
  
      const utxos = [
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0])
      ]

      api.getUtxoAtPoint
        .withArgs({
          addresses: addresses,
          referenceBlockHash: badSafeBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxos
        }))

      api.getUtxoAtPoint
        .withArgs({
          addresses: addresses,
          referenceBlockHash: goodSafeBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxos
        }))
  
      const bestBlock = await randomBlockAfter(goodSafeBlock, 10)
      api.getBestBlock
        .returns(Promise.resolve(bestBlock.hash))
      
      const utxoDiff: UtxoDiff = {
        diffItems: [
          await randomUtxoDiffOutput(addresses[0]),
          await randomUtxoDiffInput(utxos[2].utxoId)
        ],
      }

      api.getTipStatusWithReference
        .withArgs([
          badSafeBlock.hash
        ])
        .returns(Promise.resolve({
          result: UtxoApiResult.SAFEBLOCK_ROLLBACK,
        }))

      api.getTipStatusWithReference
        .withArgs([
          goodSafeBlock.hash
        ])
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: {
            reference: {
              lastFoundBestBlock: goodSafeBlock.hash,
              lastFoundSafeBlock: goodSafeBlock.hash
            }
          }
        }))

      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: goodSafeBlock.hash,
          untilBlockHash: bestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxoDiff
        }))
  
      // act
      const sut = new UtxoService(api, utxoStorage)
      await sut.syncUtxoState(addresses)
  
      // assert
      sinon.default.assert.called(utxoStorage.replaceUtxoAtSafePoint.withArgs(utxos, goodSafeBlock.hash))
      sinon.default.assert.called(utxoStorage.appendUtxoDiffToBestBlock.withArgs({
        lastBestBlockHash: bestBlock.hash,
        spentUtxoIds: [utxoDiff.diffItems[1].id],
        newUtxos: [
          (utxoDiff.diffItems[0] as UtxoDiffItemOutput).utxo
        ]
      }))
    })

    it('should handle when safeblock gets invalidated', async () => {
      // arrange
      const addresses = [
        await randomFakeAddress()
      ]

      const badSafeBlock = await randomBlock()
      const goodSafeBlock = await randomBlock()
      const safeBlockSequence = [badSafeBlock.hash, goodSafeBlock.hash].reverse()
      api.getSafeBlock
        .callsFake(() => {
          return Promise.resolve(safeBlockSequence.pop() as string)
        })
  
      const utxos = [
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0])
      ]
  
      api.getUtxoAtPoint
        .withArgs({
          addresses: addresses,
          referenceBlockHash: badSafeBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SAFEBLOCK_ROLLBACK
        }))

      api.getUtxoAtPoint
        .withArgs({
          addresses: addresses,
          referenceBlockHash: goodSafeBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxos
        }))
  
      const bestBlock = await randomBlockAfter(goodSafeBlock, 10)
      api.getBestBlock
        .returns(Promise.resolve(bestBlock.hash))
      
      const utxoDiff: UtxoDiff = {
        diffItems: [
          await randomUtxoDiffOutput(addresses[0]),
          await randomUtxoDiffInput(utxos[2].utxoId)
        ],
      }

      api.getTipStatusWithReference
        .withArgs([
          goodSafeBlock.hash
        ])
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: {
            reference: {
              lastFoundBestBlock: goodSafeBlock.hash,
              lastFoundSafeBlock: goodSafeBlock.hash
            }
          }
        }))

      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: goodSafeBlock.hash,
          untilBlockHash: bestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxoDiff
        }))
  
      // act
      const sut = new UtxoService(api, utxoStorage)
      await sut.syncUtxoState(addresses)
  
      // assert
      sinon.default.assert.called(utxoStorage.replaceUtxoAtSafePoint.withArgs(utxos, goodSafeBlock.hash))
      sinon.default.assert.called(utxoStorage.appendUtxoDiffToBestBlock.withArgs({
        lastBestBlockHash: bestBlock.hash,
        spentUtxoIds: [utxoDiff.diffItems[1].id],
        newUtxos: [
          (utxoDiff.diffItems[0] as UtxoDiffItemOutput).utxo
        ]
      }))
    })

    it('should handle when safeblock gets invalidated mid-sync', async () => {
      // arrange
      const addresses = [
        await randomFakeAddress()
      ]

      const badSafeBlock = await randomBlock()
      const goodSafeBlock = await randomBlock()
      const safeBlockSequence = [badSafeBlock.hash, goodSafeBlock.hash].reverse()
      api.getSafeBlock
        .callsFake(() => {
          return Promise.resolve(safeBlockSequence.pop() as string)
        })
  
      const utxos = [
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0]),
        await randomUtxo(addresses[0])
      ]
  
      api.getUtxoAtPoint
        .withArgs({
          addresses: addresses,
          referenceBlockHash: badSafeBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxos
        }))

      api.getUtxoAtPoint
        .withArgs({
          addresses: addresses,
          referenceBlockHash: goodSafeBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxos
        }))
  
      const bestBlock = await randomBlockAfter(goodSafeBlock, 10)
      api.getBestBlock
        .returns(Promise.resolve(bestBlock.hash))
      
      const utxoDiff: UtxoDiff = {
        diffItems: [
          await randomUtxoDiffOutput(addresses[0]),
          await randomUtxoDiffInput(utxos[2].utxoId)
        ],
      }

      api.getTipStatusWithReference
        .withArgs([
          badSafeBlock.hash
        ])
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: {
            reference: {
              lastFoundBestBlock: badSafeBlock.hash,
              lastFoundSafeBlock: badSafeBlock.hash
            }
          }
        }))

      api.getTipStatusWithReference
        .withArgs([
          goodSafeBlock.hash
        ])
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: {
            reference: {
              lastFoundBestBlock: goodSafeBlock.hash,
              lastFoundSafeBlock: goodSafeBlock.hash
            }
          }
        }))

      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: badSafeBlock.hash,
          untilBlockHash: bestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SAFEBLOCK_ROLLBACK,
        }))

      api.getUtxoDiffSincePoint
        .withArgs({
          addresses: addresses,
          afterBestBlock: goodSafeBlock.hash,
          untilBlockHash: bestBlock.hash
        })
        .returns(Promise.resolve({
          result: UtxoApiResult.SUCCESS,
          value: utxoDiff
        }))
  
      // act
      const sut = new UtxoService(api, utxoStorage)
      await sut.syncUtxoState(addresses)
  
      // assert
      sinon.default.assert.called(utxoStorage.clearUtxoState)
      sinon.default.assert.called(utxoStorage.replaceUtxoAtSafePoint.withArgs(utxos, goodSafeBlock.hash))
      sinon.default.assert.called(utxoStorage.appendUtxoDiffToBestBlock.withArgs({
        lastBestBlockHash: bestBlock.hash,
        spentUtxoIds: [utxoDiff.diffItems[1].id],
        newUtxos: [
          (utxoDiff.diffItems[0] as UtxoDiffItemOutput).utxo
        ]
      }))
    })
  })
  
  describe('get available UTxOs', () => {
    it('should get utxos from safe point', async () => {
      // arrange
      const address = await randomFakeAddress()

      const safeUtxos = [
        await randomUtxo(address),
        await randomUtxo(address),
        await randomUtxo(address),
        await randomUtxo(address)
      ]

      utxoStorage.getUtxoAtSafePoint
        .returns(Promise.resolve({
          lastSafeBlockHash: await random256Hash(),
          utxos: safeUtxos
        }))

      utxoStorage.getUtxoDiffToBestBlock
        .returns(Promise.resolve([]))

      // act
      const sut = new UtxoService(api, utxoStorage)
      const utxos = await sut.getAvailableUtxos()

      // asssert
      expect(utxos).to.eql(safeUtxos)
    })

    it('should get utxos from diff', async () => {
      // arrange
      const address = await randomFakeAddress()

      const diffs = [
        {
          lastBestBlockHash: await random256Hash(),
          newUtxos: [
            await randomUtxo(address),
            await randomUtxo(address),
            await randomUtxo(address)
          ],
          spentUtxoIds: []
        } as UtxoDiffToBestBlock,
        {
          lastBestBlockHash: await random256Hash(),
          newUtxos: [
            await randomUtxo(address),
            await randomUtxo(address),
            await randomUtxo(address)
          ],
          spentUtxoIds: []
        } as UtxoDiffToBestBlock
      ]

      utxoStorage.getUtxoAtSafePoint
        .returns(Promise.resolve(undefined))

      utxoStorage.getUtxoDiffToBestBlock
        .returns(Promise.resolve(diffs))

      // act
      const sut = new UtxoService(api, utxoStorage)
      const utxos = await sut.getAvailableUtxos()

      // asssert
      expect(utxos).to.eql(flatten(diffs.map(d => d.newUtxos)))
    })

    it('should apply diff to safe state', async () => {
      // arrange
      const address = await randomFakeAddress()

      const safeUtxos = [
        await randomUtxo(address),
        await randomUtxo(address),
        await randomUtxo(address), // should be removed
        await randomUtxo(address)
      ]

      utxoStorage.getUtxoAtSafePoint
        .returns(Promise.resolve({
          lastSafeBlockHash: await random256Hash(),
          utxos: safeUtxos
        }))

      const uxtsoFromDiff1 = [
        await randomUtxo(address), // should be removed
        await randomUtxo(address),
        await randomUtxo(address)
      ]

      const uxtsoFromDiff2 = [
        await randomUtxo(address),
        await randomUtxo(address),
        await randomUtxo(address)
      ]

      const diffs = [
        {
          lastBestBlockHash: await random256Hash(),
          newUtxos: uxtsoFromDiff1,
          spentUtxoIds: [safeUtxos[2].utxoId]
        } as UtxoDiffToBestBlock,
        {
          lastBestBlockHash: await random256Hash(),
          newUtxos: uxtsoFromDiff2,
          spentUtxoIds: [uxtsoFromDiff1[0].utxoId]
        } as UtxoDiffToBestBlock
      ]

      utxoStorage.getUtxoDiffToBestBlock
        .returns(Promise.resolve(diffs))

      // act
      const sut = new UtxoService(api, utxoStorage)
      const utxos = await sut.getAvailableUtxos()

      // asssert
      const expectedUtxos = [
        safeUtxos[0],
        safeUtxos[1],
        safeUtxos[3],
        uxtsoFromDiff1[1],
        uxtsoFromDiff1[2],
        uxtsoFromDiff2[0],
        uxtsoFromDiff2[1],
        uxtsoFromDiff2[2]
      ]

      expect(utxos).to.eql(expectedUtxos)
    })
  })
})