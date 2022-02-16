import { expect } from 'chai'
import * as sinon from 'ts-sinon'
import { AccountService } from '../../src/account'
import {
  AccountApi,
  AccountChainProtocols,
  AccountStorage,
  EmurgoApiResult
} from '../../src/account/models'
import { randomFakeAddresses } from '../helpers/builders'
import { mockedChainProtocols, mockedStorageData } from './mock-data'

describe('Account', () => {
  let api: sinon.StubbedInstance<AccountApi>
  let storageAddress: sinon.StubbedInstance<AccountStorage>
  let chainProtocols: AccountChainProtocols

  beforeEach(() => {
    api = sinon.stubInterface<AccountApi>()
    storageAddress = sinon.stubInterface<AccountStorage>()
    chainProtocols = mockedChainProtocols
  })

  describe('from empty storage', () => {
    it('should initialize with no account', async () => {
      // arrange
      const addresses = await randomFakeAddresses(50)
      api.getAddressesUsed.returns(
        Promise.resolve({ data: addresses, result: EmurgoApiResult.SUCCESS })
      )
      storageAddress.readAccounts.returns(Promise.resolve([]))

      // act
      const sut = new AccountService(api, storageAddress, chainProtocols)
      await sut.initialize()

      // assert
      expect(sut.accounts.size).to.equal(0)
    })
    it('should create 5 empty accounts', async () => {
      // arrange
      api.getAddressesUsed.returns(
        Promise.resolve({
          data: [],
          result: EmurgoApiResult.SUCCESS
        })
      )
      storageAddress.readAccounts.returns(Promise.resolve([]))
      const accountsToCreate = 5

      // act
      const sut = new AccountService(api, storageAddress, chainProtocols)
      await sut.initialize()
      const previousAccountsSize = sut.accounts.size
      for (let i = 0; i < accountsToCreate; i++) {
        await sut.create(i)
      }

      // assert
      expect(sut.accounts.size).to.equal(
        previousAccountsSize + accountsToCreate
      )
      for (let i = 0; i < accountsToCreate; i++) {
        const accountData = sut.accounts.get(i)
        expect(accountData?.size).to.equal(chainProtocols.size)
        for (const [chain, chainProtocolData] of chainProtocols.entries()) {
          expect(accountData?.get(chain)?.addresses?.size).to.equal(
            chainProtocolData.bufferSize
          )
          expect(sut.addresses(0, chain).length).to.equal(
            chainProtocolData.gapLimit
          )
        }
      }
    })
  })
  describe('hidrate from storage data', () => {
    it('should load with 1 account', async () => {
      // arrange
      api.getAddressesUsed.returns(
        Promise.resolve({
          data: [],
          result: EmurgoApiResult.SUCCESS
        })
      )
      storageAddress.readAccounts.returns(Promise.resolve(mockedStorageData))

      // act
      const sut = new AccountService(api, storageAddress, chainProtocols)
      await sut.initialize()

      // assert
      expect(sut.accounts.size).to.equal(1)
      const accountData = sut.accounts.get(0)
      expect(accountData?.size).to.equal(chainProtocols.size)
      for (const [chain, chainProtocolData] of chainProtocols.entries()) {
        expect(accountData?.get(chain)?.addresses?.size).to.equal(
          chainProtocolData.bufferSize
        )
        expect(sut.addresses(0, chain).length).to.equal(
          chainProtocolData.gapLimit
        )
      }
    })
  })
  describe('with API updates under the gap limit', () => {
    it('should update the highest used index and not increase the buffer', async () => {
      // arrange
      const usedAddresses = [mockedStorageData[1].address]
      const addressExpectedSize = [
        // addr idx 1 = 2 pos
        (chainProtocols.get(0)?.gapLimit || 0) + 2,
        chainProtocols.get(1)?.gapLimit,
        chainProtocols.get(2)?.gapLimit
      ] // idx = chain
      api.getAddressesUsed.returns(
        Promise.resolve({
          data: usedAddresses,
          result: EmurgoApiResult.SUCCESS
        })
      )
      storageAddress.readAccounts.returns(Promise.resolve(mockedStorageData))

      // act
      const sut = new AccountService(api, storageAddress, chainProtocols)
      await sut.initialize()

      // assert
      expect(sut.accounts.size).to.equal(1)
      const accountData = sut.accounts.get(0)
      expect(accountData?.size).to.equal(chainProtocols.size)
      for (const [chain, chainProtocolData] of chainProtocols.entries()) {
        expect(accountData?.get(chain)?.addresses?.size).to.equal(
          chainProtocolData.bufferSize
        )
        expect(sut.addresses(0, chain).length).to.equal(
          addressExpectedSize[chain]
        )
      }
      expect(sut.accounts.get(0)?.get(0)?.highestAddressIndexUsed).to.equal(1)
    })
  })
  describe('with API updates over the gap limit', () => {
    it('should update the highest used index and increase the buffer', async () => {
      // arrange
      const usedAddressesMap = [4, 4, 1] // idx = chain
      const usedAddresses = [
        mockedStorageData[4].address,
        mockedStorageData[9].address,
        mockedStorageData[11].address
      ]
      api.getAddressesUsed.returns(
        Promise.resolve({
          data: usedAddresses,
          result: EmurgoApiResult.SUCCESS
        })
      )
      storageAddress.readAccounts.returns(Promise.resolve(mockedStorageData))

      // act
      const sut = new AccountService(api, storageAddress, chainProtocols)
      await sut.initialize()

      // assert
      expect(sut.accounts.size).to.equal(1)
      const accountData = sut.accounts.get(0)
      expect(accountData?.size).to.equal(chainProtocols.size)
      for (const [chain, chainProtocolData] of chainProtocols.entries()) {
        const chainMetadataData = accountData?.get(chain)
        expect(chainMetadataData?.addresses?.size).to.equal(
          chainProtocolData.bufferSize * 2
        )
        expect(chainMetadataData?.highestAddressIndexUsed).to.equal(
          usedAddressesMap[chain]
        )
      }
    })
  })
})
