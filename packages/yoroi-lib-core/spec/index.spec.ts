import { expect } from "chai";
import { YoroiLib } from "../src";

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
  })
}