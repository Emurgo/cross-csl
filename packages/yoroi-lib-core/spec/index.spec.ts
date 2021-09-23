import { expect } from "chai"
import { YoroiLib } from "../src"
import { GeneralTransactionMetadata } from '../src/wasm-contract'

/* 
  These tests were useful to start building the initial setup, but as we add the actual
  behavioral tests on the YoroiLib, we will probably discard the tests we have now
  and keep only the tests that test Yoroi-Lib directly, as they will already cover the
  testing of the WASM proxies
*/

export const setupTests = (yoroiLib: YoroiLib, suiteName: string): Mocha.Suite => {
  return describe(suiteName, () => {
    describe('Yoroi Lib', () => {
      it('should encrypt / decrypt with password', async () => {
        const password = 'my password'
        const data = 'my secret data'
  
        const passwordHex = Buffer.from(password, 'utf-8').toString('hex')
        const saltHex = 'd01747b41d72c8f1f26a7f72d28e1111d7eca73cfac0a05b431869e5f9ab8839'
        const nonceHex = 'c0fd98b73ac941aa18a258e5'
        const dataHex = Buffer.from(data, 'utf-8').toString('hex')
  
        const encrypted = await yoroiLib.encryptWithPassword(passwordHex, saltHex, nonceHex, dataHex)
        const decrypted = await yoroiLib.decryptWithPassword(passwordHex, encrypted)
  
        const dataBack = Buffer.from(decrypted, 'hex').toString('utf-8')
  
        expect(dataBack).to.equals(data)
      })
    })

    describe('BigNum', () => {
      it('should properly compare', async () => {
        const delta = await yoroiLib.WasmContract.BigNum.from_str('1000')
        const smaller = await yoroiLib.WasmContract.BigNum.from_str('100')
        const bigger = await yoroiLib.WasmContract.BigNum.from_str('10000')
        const equal = await yoroiLib.WasmContract.BigNum.from_str('1000')
        
        expect(await delta.compare(smaller)).to.equals(1)
        expect(await delta.compare(bigger)).to.equals(-1)
        expect(await delta.compare(equal)).to.equals(0)
      })
    })

    describe('LinearFee', () => {
      it('should create LinearFee', async () => {
        const coefficient = await yoroiLib.WasmContract.BigNum.from_str('100000')
        const constant = await yoroiLib.WasmContract.BigNum.from_str('1000')

        const linearFee = await yoroiLib.WasmContract.LinearFee.new(coefficient, constant)

        const compareCoefficient = await linearFee.coefficient()
        const compareConstant = await linearFee.constant()

        expect(await coefficient.compare(compareCoefficient)).to.equals(0)
        expect(await constant.compare(compareConstant)).to.equals(0)
      })
    })

    describe('AuxiliaryData, GeneralTransactionMetadata & TransactionMetadatum', () => {
      it('should insert metadata', async () => {
        const assertMetadata = async (metadata: GeneralTransactionMetadata) => {
          const meta = await metadata.get(metaKey)
          expect(meta).to.not.be.undefined

          const bytes = await meta.to_bytes()
          const str = Buffer.from(bytes).toString('ascii')
          
          expect(str)
            .to.contain('id')
            .and.to.contain('1')
            .and.to.contain('image')
            .and.to.contain('path://image')
        }
        const metaKey = await yoroiLib.WasmContract.BigNum.from_str('721')

        const metadata = await yoroiLib.WasmContract.GeneralTransactionMetadata.new()

        const shouldBeUndefined = await metadata.get(metaKey)
        expect(shouldBeUndefined).to.be.undefined

        const metadatum = await yoroiLib.WasmContract.encode_json_str_to_metadatum(
          JSON.stringify({image: 'path://image', id: '1'}),
          1 // Basic convertions
        )

        await metadata.insert(metaKey, metadatum)

        await assertMetadata(metadata)

        const aux = await yoroiLib.WasmContract.AuxiliaryData.new(metadata)
        const metaFromAux = await aux.metadata()

        await assertMetadata(metaFromAux)
      })
    })

    // this test is here just as a sample
    describe('Tx Builder', () => {
      it('should work for now', async () => {
        await yoroiLib.createUnsignedTx({
          keyDeposit: '10',
          linearFee: {
            coefficient: '10',
            constant: '10'
          },
          minimumUtxoVal: '10',
          networkId: 'n',
          poolDeposit: '10'
        }, {
          receiver: 'addr_test1qqng02gr4ltw28a84pc6ce2paq8m439vuv6dfzdyl2n05q9guds8e4s57thr4zwzp0qkzzyzvpjqu2zs8pqyv7pyhu5seku7js',
          metadata: [
            {
              data: {
                image: 'src://path'
              },
              label: '721'
            },
          ],
          sendAll: false
        })
      })
    })
  })
}
