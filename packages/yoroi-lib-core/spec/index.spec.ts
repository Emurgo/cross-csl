import { BigNumber } from 'bignumber.js';

import { expect } from 'chai';
import { YoroiLib } from '../src';
import {
  AddressingAddress,
  AddressingUtxo,
  CardanoHaskellConfig,
  DefaultTokenEntry,
  SendToken,
  TxMetadata
} from '../src/models';
import { GeneralTransactionMetadata } from '../src/wasm-contract';

/* 
  These tests were useful to start building the initial setup, but as we add the actual
  behavioral tests on the YoroiLib, we will probably discard the tests we have now
  and keep only the tests that test Yoroi-Lib directly, as they will already cover the
  testing of the WASM proxies
*/

export const setupTests = (
  yoroiLib: YoroiLib,
  suiteName: string
): Mocha.Suite => {
  return describe(suiteName, () => {
    describe('Yoroi Lib', () => {
      it('should encrypt / decrypt with password', async () => {
        const password = 'my password';
        const data = 'my secret data';

        const passwordHex = Buffer.from(password, 'utf-8').toString('hex');
        const saltHex =
          'd01747b41d72c8f1f26a7f72d28e1111d7eca73cfac0a05b431869e5f9ab8839';
        const nonceHex = 'c0fd98b73ac941aa18a258e5';
        const dataHex = Buffer.from(data, 'utf-8').toString('hex');

        const encrypted = await yoroiLib.encryptWithPassword(
          passwordHex,
          saltHex,
          nonceHex,
          dataHex
        );
        const decrypted = await yoroiLib.decryptWithPassword(
          passwordHex,
          encrypted
        );

        const dataBack = Buffer.from(decrypted, 'hex').toString('utf-8');

        expect(dataBack).to.equals(data);
      });
    });

    describe('BigNum', () => {
      it('should properly compare', async () => {
        const delta = await yoroiLib.Wasm.BigNum.fromStr('1000');
        const smaller = await yoroiLib.Wasm.BigNum.fromStr('100');
        const bigger = await yoroiLib.Wasm.BigNum.fromStr('10000');
        const equal = await yoroiLib.Wasm.BigNum.fromStr('1000');

        expect(await delta.compare(smaller)).to.equals(1);
        expect(await delta.compare(bigger)).to.equals(-1);
        expect(await delta.compare(equal)).to.equals(0);
      });
    });

    describe('LinearFee', () => {
      it('should create LinearFee', async () => {
        const coefficient = await yoroiLib.Wasm.BigNum.fromStr('100000');
        const constant = await yoroiLib.Wasm.BigNum.fromStr('1000');

        const linearFee = await yoroiLib.Wasm.LinearFee.new(
          coefficient,
          constant
        );

        const compareCoefficient = await linearFee.coefficient();
        const compareConstant = await linearFee.constant();

        expect(await coefficient.compare(compareCoefficient)).to.equals(0);
        expect(await constant.compare(compareConstant)).to.equals(0);
      });
    });

    describe('AuxiliaryData, GeneralTransactionMetadata & TransactionMetadatum', () => {
      it('should insert metadata', async () => {
        const assertMetadata = async (metadata: GeneralTransactionMetadata) => {
          const meta = await metadata.get(metaKey);
          expect(meta).to.not.be.undefined;

          const bytes = await meta.toBytes();
          const str = Buffer.from(bytes).toString('ascii');

          expect(str)
            .to.contain('id')
            .and.to.contain('1')
            .and.to.contain('image')
            .and.to.contain('path://image');
        };
        const metaKey = await yoroiLib.Wasm.BigNum.fromStr('721');

        const metadata = await yoroiLib.Wasm.GeneralTransactionMetadata.new();

        const shouldBeUndefined = await metadata.get(metaKey);
        expect(shouldBeUndefined).to.be.undefined;

        const metadatum = await yoroiLib.Wasm.encodeJsonStrToMetadatum(
          JSON.stringify({ image: 'path://image', id: '1' }),
          1 // Basic convertions
        );

        await metadata.insert(metaKey, metadatum);

        await assertMetadata(metadata);

        const aux = await yoroiLib.Wasm.AuxiliaryData.new(metadata);
        const metaFromAux = await aux.metadata();

        await assertMetadata(metaFromAux);
      });
    });

    describe('Tx Builder', () => {
      const buildDummyTxParameters = (sendAll: boolean) => {
        const absSlotNumber = new BigNumber(38484054);
        const utxos = [
          {
            address:
              '002c6d359437c1c6c39ad5860e358aec43894db01c243ee43ab178bbd5a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
            addressing: {
              path: [2147485500, 4294967295, 2147483648, 0, 3],
              startLevel: 1
            },
            output: {
              transaction: {
                hash: '441df8be3d1d8bf1ef7d5b4701bb48495d17e3ef9888afed70e7aa93d7ac6785'
              },
              utxoTransactionOutput: {
                outputIndex: 0
              },
              tokens: [
                {
                  token: {
                    identifier: '',
                    isDefault: true,
                    networkId: 300
                  },
                  tokenList: {
                    amount: '2000000'
                  }
                }
              ]
            }
          },
          {
            address:
              '002c6d359437c1c6c39ad5860e358aec43894db01c243ee43ab178bbd5a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
            addressing: {
              path: [2147485500, 2147485463, 2147483648, 0, 3],
              startLevel: 1
            },
            output: {
              transaction: {
                hash: 'e25f0b9c1e68b5969931b0c9106ad23e40ea79b2e6a6f809034a91275e63a376'
              },
              utxoTransactionOutput: {
                outputIndex: 0
              },
              tokens: [
                {
                  token: {
                    identifier: '',
                    isDefault: true,
                    networkId: 300
                  },
                  tokenList: {
                    amount: '3000000'
                  }
                }
              ]
            }
          },
          {
            address:
              '00a8fa65dae16002bed4e5a99cca63ad9094cfbc255115ce25bb076de3a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
            addressing: {
              path: [2147485500, 2147485463, 2147483648, 1, 6],
              startLevel: 1
            },
            output: {
              transaction: {
                hash: '11cdf58509c9602d902daea72756d9ab54be13a88e5b596261dcdec91f22c5cf'
              },
              utxoTransactionOutput: {
                outputIndex: 1
              },
              tokens: [
                {
                  token: {
                    identifier: '',
                    isDefault: true,
                    networkId: 300
                  },
                  tokenList: {
                    amount: '537206659'
                  }
                },
                {
                  token: {
                    identifier:
                      '4a8e145beaee9764aa956633a68ea3d2e69e75736f48ed9e82441097.54657374746f6b656e',
                    isDefault: false,
                    networkId: 300
                  },
                  tokenList: {
                    amount: '2'
                  }
                },
                {
                  token: {
                    identifier:
                      '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7.',
                    isDefault: false,
                    networkId: 300
                  },
                  tokenList: {
                    amount: '2'
                  }
                }
              ]
            }
          }
        ] as Array<AddressingUtxo>;
        const receiver =
          '00d899507bde3a7ee733ab3a0cfb71ea202ad8e6e261f241ed4d7d374ff466c7a32c2e0f5cc362d2323efc1ef0d5cf93aaf377b9fc8c4f0e82';
        const changeAddress = {
          address:
            '00811e763774f6ff59835619924f26cc99e1a2320b6edfe40d00ced1a6a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 7],
            startLevel: 1
          }
        } as AddressingAddress;
        const tokens = [
          {
            amount: new BigNumber(38484054),
            shouldSendAll: sendAll,
            token: {
              identifier: '',
              isDefault: true,
              networkId: 300
            }
          }
        ] as Array<SendToken>;
        const config = {
          keyDeposit: '2000000',
          linearFee: {
            constant: '155381',
            coefficient: '44'
          },
          minimumUtxoVal: '1000000',
          poolDeposit: '500000000',
          networkId: 300
        } as CardanoHaskellConfig;
        const defaultToken = {
          defaultIdentifier: '',
          defaultNetworkId: 300
        } as DefaultTokenEntry;

        return {
          absSlotNumber,
          utxos,
          receiver,
          changeAddress,
          tokens,
          config,
          defaultToken
        };
      };

      it('should build and sign TX', async () => {
        const params = buildDummyTxParameters(false);

        const unsignedTx = await yoroiLib.createUnsignedTx(
          params.absSlotNumber,
          params.utxos,
          params.receiver,
          params.changeAddress,
          params.tokens,
          params.config,
          params.defaultToken,
          {}
        );

        const keyLevel = 0;
        const privateKey = 'e8c9a059f04a369553df01e4ed8717a97c3cdf2e51e14292e96b8509db8a0442299023959cc6fe889b3f1af85512bb75215ded32e99f0c7f55d9b64629c6efcf9c46e83bf190f51db20951ed451b4f51d10e26df3318d8c3394e65e485567c09';
        const stakingKeyWits = new Set<string>();
        const metadata = {
          label: '0010100',
          data: {}
        } as TxMetadata;

        await unsignedTx.sign(keyLevel, privateKey, stakingKeyWits, metadata);
      }).timeout(10000);

      it('should build and sign TX for sending all balance', async () => {
        const params = buildDummyTxParameters(true);

        const unsignedTx = await yoroiLib.createUnsignedTx(
          params.absSlotNumber,
          params.utxos,
          params.receiver,
          params.changeAddress,
          params.tokens,
          params.config,
          params.defaultToken,
          {}
        );

        const keyLevel = 0;
        const privateKey = 'e8c9a059f04a369553df01e4ed8717a97c3cdf2e51e14292e96b8509db8a0442299023959cc6fe889b3f1af85512bb75215ded32e99f0c7f55d9b64629c6efcf9c46e83bf190f51db20951ed451b4f51d10e26df3318d8c3394e65e485567c09';
        const stakingKeyWits = new Set<string>();
        const metadata = {
          label: '0010100',
          data: {}
        } as TxMetadata;

        await unsignedTx.sign(keyLevel, privateKey, stakingKeyWits, metadata);
      });
    });
  });
};
