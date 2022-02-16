import { Axios, AxiosResponse } from 'axios'
import { expect } from 'chai'
import * as sinon from 'ts-sinon'
import { EmurgoAccountApi } from '../../src/account/emurgo-api'
import {
  AccountApiConfig,
  AddressesUsedApiResponse,
  EmurgoApiResult
} from '../../src/account/models'
import { chunk } from '../../src/internals/utils/js'
import { randomFakeAddresses } from '../helpers/builders'

const apiConfig: AccountApiConfig = {
  maxAddressesPerRequest: 50,
  url: 'http://address.api.io/'
}

describe('Address API', () => {
  let axios: sinon.StubbedInstance<Axios>
  let baseApi: EmurgoAccountApi

  beforeEach(() => {
    axios = sinon.stubInterface<Axios>()
    baseApi = new EmurgoAccountApi(apiConfig, axios)
  })

  it('should return the used addresses when query is gte max per request', async () => {
    // arrange
    const addresses = await randomFakeAddresses(
      apiConfig.maxAddressesPerRequest * 3
    )
    const batches = chunk(addresses, apiConfig.maxAddressesPerRequest)

    batches.forEach((batch) => {
      axios.post
        .withArgs(`${apiConfig.url}v2/addresses/filterUsed`, {
          addresses: batch
        })
        .returns(
          Promise.resolve({
            data: batch
          } as AxiosResponse<AddressesUsedApiResponse>)
        )
    })
  })

  it('should return the used addresses when query is lte max per request', async () => {
    // arrange
    const addresses = await randomFakeAddresses(
      apiConfig.maxAddressesPerRequest
    )
    const batches = chunk(addresses, apiConfig.maxAddressesPerRequest)

    batches.forEach((batch) => {
      axios.post
        .withArgs(`${apiConfig.url}v2/addresses/filterUsed`, {
          addresses: batch
        })
        .returns(
          Promise.resolve({
            data: batch
          } as AxiosResponse<AddressesUsedApiResponse>)
        )
    })

    // act
    const sut = baseApi
    const { result, data } = await sut.getAddressesUsed({
      addresses: addresses
    })

    // assert
    expect(result).to.equal(EmurgoApiResult.SUCCESS)
    expect(data?.length).to.equal(apiConfig.maxAddressesPerRequest)
    expect(data).to.eql(addresses)
  })
})
