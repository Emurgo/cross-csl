import axiospkg, { Axios } from 'axios'
import { chunk, flatten } from '../internals/utils/js'
import {
  AccountApi,
  AccountApiConfig,
  AccountApiResponse,
  AddressesUsedApiRequest,
  AddressesUsedApiResponse,
  EmurgoApiResult
} from './models'

export class EmurgoAccountApi implements AccountApi {
  readonly _axios: Axios
  readonly _apiConfig: AccountApiConfig

  constructor(apiConfig: AccountApiConfig, axios: Axios = axiospkg) {
    this._axios = axios
    this._apiConfig = apiConfig
  }

  async getAddressesUsed(
    req: AddressesUsedApiRequest
  ): Promise<AccountApiResponse<string[]>> {
    const url = `${this._apiConfig.url}v2/addresses/filterUsed`
    const addressChunks = chunk(
      req.addresses,
      this._apiConfig.maxAddressesPerRequest
    )
    const promises = addressChunks.map(
      async (addresses) =>
        await this._axios.post<AddressesUsedApiResponse>(url, {
          addresses
        })
    )
    const responses = await Promise.all(promises)
    const result = flatten(responses.map((response) => response?.data || []))
    return {
      result: EmurgoApiResult.SUCCESS,
      data: result
    }
  }
}
