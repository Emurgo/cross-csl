import { WasmModuleProxy } from '../src/index';
import { expect } from 'chai';

export const setupTests = (
  wasm: WasmModuleProxy,
  suiteName: string
): Mocha.Suite => {
  return describe(suiteName, () => {
    describe('BigNum', () => {
      if (suiteName !== 'Cross CSL Mobile') {
        it('.fromBytes()', async () => {
          const o = await wasm.BigNum.fromBytes(Buffer.from([0]));
          expect(o.hasValue()).to.be.true;
        });
        it('.toBytes()', async () => {
          const o = await wasm.BigNum
            .fromStr('1')
            .then(x => x.toBytes())
            .then(x => [...x]);
          expect(o).to.eql([1]);
        });
        it('.checkedMul()', async () => {
          const x = await wasm.BigNum.fromStr('5');
          const y = await wasm.BigNum.fromStr('4');
          const z = await x.checkedMul(y);
          expect(await z.toStr()).to.eql('20');
        });
      }
      
      it('.fromStr()', async () => {
        const o = await wasm.BigNum.fromStr('1');
        expect(o.hasValue()).to.be.true;
      });
      it('.toStr()', async () => {
        const o = await wasm.BigNum
          .fromStr('1')
          .then(x => x.toStr());
        expect(o).to.eql('1');
      });
      it('.checkedAdd()', async () => {
        const x = await wasm.BigNum.fromStr('5');
        const y = await wasm.BigNum.fromStr('4');
        const z = await x.checkedAdd(y);
        expect(await z.toStr()).to.eql('9');
      });
      it('.checkedSub()', async () => {
        const x = await wasm.BigNum.fromStr('5');
        const y = await wasm.BigNum.fromStr('4');
        const z = await x.checkedSub(y);
        expect(await z.toStr()).to.eql('1');
      });
      it('.compare()', async () => {
        const x = await wasm.BigNum.fromStr('5');
        const y = await wasm.BigNum.fromStr('4');
        const z = await wasm.BigNum.fromStr('5');
        const zz = await wasm.BigNum.fromStr('6');
        expect(await x.compare(y)).to.eql(1);
        expect(await x.compare(z)).to.eql(0);
        expect(await x.compare(zz)).to.eql(-1);
      });
    });
  });
};
