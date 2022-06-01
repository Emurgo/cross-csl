import { BigNumber } from 'bignumber.js'
import { expect } from 'chai'
import {
  AddressingAddress,
  CardanoAddressedUtxo,
  CardanoHaskellConfig,
  Token,
  IYoroiLib,
  SendToken
} from '../src'
import {
  GeneralTransactionMetadata,
  RewardAddress
} from '../src/internals/wasm-contract'

/*
  These tests were useful to start building the initial setup, but as we add the actual
  behavioral tests on the YoroiLib, we will probably discard the tests we have now
  and keep only the tests that test Yoroi-Lib directly, as they will already cover the
  testing of the WASM proxies
*/

const absSlotNumber = new BigNumber(38484054)
const cardanoConfig = {
  keyDeposit: '2000000',
  linearFee: {
    constant: '155381',
    coefficient: '44'
  },
  minimumUtxoVal: '1000000',
  poolDeposit: '500000000',
  networkId: 300
} as CardanoHaskellConfig

const buildDummyTxParameters = (sendAll: boolean) => {
  const utxos: CardanoAddressedUtxo[] = [
    {
      addressing: {
        path: [2147485500, 4294967295, 2147483648, 0, 3],
        startLevel: 1
      },
      amount: '2000000',
      assets: [],
      receiver:
        '002c6d359437c1c6c39ad5860e358aec43894db01c243ee43ab178bbd5a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
      txHash:
        '441df8be3d1d8bf1ef7d5b4701bb48495d17e3ef9888afed70e7aa93d7ac6785',
      txIndex: 0,
      utxoId:
        '441df8be3d1d8bf1ef7d5b4701bb48495d17e3ef9888afed70e7aa93d7ac67850'
    },
    {
      addressing: {
        path: [2147485500, 2147485463, 2147483648, 0, 3],
        startLevel: 1
      },
      amount: '3000000',
      assets: [],
      receiver:
        '002c6d359437c1c6c39ad5860e358aec43894db01c243ee43ab178bbd5a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
      txHash:
        'e25f0b9c1e68b5969931b0c9106ad23e40ea79b2e6a6f809034a91275e63a376',
      txIndex: 0,
      utxoId:
        'e25f0b9c1e68b5969931b0c9106ad23e40ea79b2e6a6f809034a91275e63a3760'
    },
    {
      addressing: {
        path: [2147485500, 2147485463, 2147483648, 1, 6],
        startLevel: 1
      },
      amount: '537206659',
      assets: [
        {
          amount: '2',
          assetId:
            '4a8e145beaee9764aa956633a68ea3d2e69e75736f48ed9e82441097.54657374746f6b656e'
        },
        {
          amount: '2',
          assetId: '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7.'
        }
      ],
      receiver:
        '00a8fa65dae16002bed4e5a99cca63ad9094cfbc255115ce25bb076de3a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
      txHash:
        '11cdf58509c9602d902daea72756d9ab54be13a88e5b596261dcdec91f22c5cf',
      txIndex: 1,
      utxoId:
        '11cdf58509c9602d902daea72756d9ab54be13a88e5b596261dcdec91f22c5cf1'
    }
  ]
  const receiver =
    '00d899507bde3a7ee733ab3a0cfb71ea202ad8e6e261f241ed4d7d374ff466c7a32c2e0f5cc362d2323efc1ef0d5cf93aaf377b9fc8c4f0e82'
  const changeAddress = {
    address:
      '00811e763774f6ff59835619924f26cc99e1a2320b6edfe40d00ced1a6a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
    addressing: {
      path: [2147485500, 2147485463, 2147483648, 1, 7],
      startLevel: 1
    }
  } as AddressingAddress
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
  ] as Array<SendToken>

  const defaultToken = {
    identifier: '',
    networkId: 300,
    isDefault: true
  } as Token

  return {
    absSlotNumber,
    utxos,
    receiver,
    changeAddress,
    tokens,
    config: cardanoConfig,
    defaultToken
  }
}

export const setupTests = (
  yoroiLib: IYoroiLib,
  suiteName: string
): Mocha.Suite => {
  return describe(suiteName, () => {
    describe('Yoroi Lib', () => {
      /*
        this if statement is not ideal, as a simple change to the suite name would break the tests.
        currently, an api from Transaction needed for the id calculation is missing from the WASM
        implementation on the @emurgo/reactive-native-haskell-shelley, but we want this feature
        to be available at least on nodejs, so we are adding it now.

        changing this to a more robust test selection, for example, in a way that the client
        can specify what they want to get tested would be over-engeneering for now, so we keep this if statement.

        if we start having more and more of these edge cases, then we think about a smarter solution.
       */
      if (suiteName !== 'Yoroi Lib Mobile') {
        it('should calculate TX id', async () => {
          const txbase64 =
            'g6QAhIJYIEYPErLtHf+86Djrjh+UH+hVnsXZ+VJ5qFxxr2l93JuNAIJYIEo4FIzsip/FoiJcGCGnl14hEJFsPENcYDlYJoRiFOlYAIJYIJNs1337djWOTF5vbRuJmUxL2YlnP/67rk1zTEZkBk15AIJYIC7S2EfKttLmiA1+3sIM3aUP0toZTenC4VD0gsi43PACAQGCglg5ANqYSau5rMMYRpZcNcZzK5fVqwStPJ8Lq9yN37n0ZsejLC4PXMNi0jI+/B7w1c+TqvN3ufyMTw6CGgL68ICCWDkArTU80Ef+vzikU3+aiuUyjIb1qG9W0kQJ/Yq8FqjjYHzWFPLuOonCC8FhCIJgZA4oUDhARngkvymCGhr7InyiWBxKjhRb6u6XZKqVZjOmjqPS5p51c29I7Z6CRBCXoUlUZXN0dG9rZW4CWBxrjQfWljnpQT3WN6GoFacyPGnIaruvtm2/2xqnoUACAhoAAuUxAxoCcA7moQCEglggnTTDdtPwWZ1UKygPssOpGOXFE23AyXhXTlyfscWRQzJYQCQWKcmkuGBNtT5wHsOf9dyf1ZiRk5o4G7LobhML5My66cBL5VKWBOinGSvumT0FsJERLIn3DJUum3RoijlyAwyCWCAjBsK2Wg8fBgpzDykII3OnJ0x/FnCNA1mU46R7IeGLN1hARUThXPQVtkkFg09eZS/JmuK3DQQKw4lC9WNcmAV+arX9O2z1d5OJaKfGYeh9QlNL4i+64wHEgaDG2lTCTYdUAoJYIHPuUUU8vKI0FgH2NA2owrTqRf1W1+8EfI66r64MEHhwWEBeNi216UIBIweEuvpWslGxQmctAwn+GlqwWKOpanPD4+6sOdFxiKxYltIPG7IOA2JQl6850eWaWIq4ofoXnMkJglggRP2luPiT4Of8Whc/mrofpt2tBvmBPGR87SL1JuN1R3FYQFM+1+JEa89yK16T6IiY+5FyUVplZrtuAahR4/6vlNq1b2FBrNl/B3gNnyLZT80jT/5AeqwD5KHkvqcB2NzG3gL2'
          const txId = await yoroiLib.calculateTxId(txbase64, 'base64')

          expect(txId).to.equals(
            'aa5faffc0ffbdd924e0dfcd18ce3b024f7365c1b2531d9c3f125fc87ab7cba5f'
          )
        })
      }

      it('should return correct network info', async () => {
        const testnet = await yoroiLib.Wasm.NetworkInfo.testnet()
        const mainnet = await yoroiLib.Wasm.NetworkInfo.mainnet()

        const testnetNetworkId = await testnet.networkId()
        const mainnetNetworkId = await mainnet.networkId()

        expect(testnetNetworkId).to.equals(0)
        expect(mainnetNetworkId).to.equals(1)
      })

      it('should encrypt / decrypt with password', async () => {
        const password = 'my password'
        const data = 'my secret data'

        const passwordHex = Buffer.from(password, 'utf-8').toString('hex')
        const saltHex =
          'd01747b41d72c8f1f26a7f72d28e1111d7eca73cfac0a05b431869e5f9ab8839'
        const nonceHex = 'c0fd98b73ac941aa18a258e5'
        const dataHex = Buffer.from(data, 'utf-8').toString('hex')

        const encrypted = await yoroiLib.encryptWithPassword(
          passwordHex,
          saltHex,
          nonceHex,
          dataHex
        )
        const decrypted = await yoroiLib.decryptWithPassword(
          passwordHex,
          encrypted
        )

        const dataBack = Buffer.from(decrypted, 'hex').toString('utf-8')

        expect(dataBack).to.equals(data)
      })
    })

    describe('BigNum', () => {
      it('should properly compare', async () => {
        const delta = await yoroiLib.Wasm.BigNum.fromStr('1000')
        const smaller = await yoroiLib.Wasm.BigNum.fromStr('100')
        const bigger = await yoroiLib.Wasm.BigNum.fromStr('10000')
        const equal = await yoroiLib.Wasm.BigNum.fromStr('1000')
        const zero = await yoroiLib.Wasm.BigNum.fromStr('0')
        const subbed = await delta.clampedSub(
          await yoroiLib.Wasm.BigNum.fromStr('1000')
        )

        expect(await delta.compare(smaller)).to.equals(1)
        expect(await delta.compare(bigger)).to.equals(-1)
        expect(await delta.compare(equal)).to.equals(0)
        expect(await subbed.compare(zero)).to.equals(0)
      })
    })

    describe('LinearFee', () => {
      it('should create LinearFee', async () => {
        const coefficient = await yoroiLib.Wasm.BigNum.fromStr('100000')
        const constant = await yoroiLib.Wasm.BigNum.fromStr('1000')

        const linearFee = await yoroiLib.Wasm.LinearFee.new(
          coefficient,
          constant
        )

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

          const bytes = await meta.toBytes()
          const str = Buffer.from(bytes).toString('ascii')

          expect(str)
            .to.contain('id')
            .and.to.contain('1')
            .and.to.contain('image')
            .and.to.contain('path://image')
        }
        const metaKey = await yoroiLib.Wasm.BigNum.fromStr('721')

        const metadata = await yoroiLib.Wasm.GeneralTransactionMetadata.new()

        const shouldNotHaveValue = await metadata.get(metaKey)
        expect(shouldNotHaveValue.hasValue()).to.be.false

        const metadatum = await yoroiLib.Wasm.encodeJsonStrToMetadatum(
          JSON.stringify({ image: 'path://image', id: '1' }),
          1 // Basic convertions
        )

        await metadata.insert(metaKey, metadatum)

        await assertMetadata(metadata)

        const aux = await yoroiLib.Wasm.AuxiliaryData.new(metadata)
        const metaFromAux = await aux.metadata()

        await assertMetadata(metaFromAux)
      })
    })

    describe('Tx Builder', () => {
      it('should build and sign TX', async () => {
        const params = buildDummyTxParameters(false)

        const unsignedTx = await yoroiLib.createUnsignedTx(
          params.absSlotNumber,
          params.utxos,
          params.receiver,
          params.changeAddress,
          params.tokens,
          params.config,
          params.defaultToken,
          {}
        )

        const keyLevel = 0
        const privateKey =
          'e8c9a059f04a369553df01e4ed8717a97c3cdf2e51e14292e96b8509db8a0442299023959cc6fe889b3f1af85512bb75215ded32e99f0c7f55d9b64629c6efcf9c46e83bf190f51db20951ed451b4f51d10e26df3318d8c3394e65e485567c09'
        const stakingKeyWits = new Set<string>()

        await unsignedTx.sign(keyLevel, privateKey, stakingKeyWits, [])

        expect(unsignedTx.outputs.length).to.equal(2)
        expect(unsignedTx.change.length).to.equal(1)
      }).timeout(100000)

      it('should build and sign TX with native assets', async () => {
        const utxos: CardanoAddressedUtxo[] = [
          {
            addressing: {
              path: [2147485500, 2147485463, 2147483648, 1, 6],
              startLevel: 1
            },
            amount: '537206659',
            assets: [
              {
                amount: '2',
                assetId:
                  '4a8e145beaee9764aa956633a68ea3d2e69e75736f48ed9e82441097.54657374746f6b656e'
              }
            ],
            receiver:
              '00a8fa65dae16002bed4e5a99cca63ad9094cfbc255115ce25bb076de3a8e3607cd614f2ee3a89c20bc161088260640e28503840467824bf29',
            txHash:
              '11cdf58509c9602d902daea72756d9ab54be13a88e5b596261dcdec91f22c5cf',
            txIndex: 1,
            utxoId:
              '11cdf58509c9602d902daea72756d9ab54be13a88e5b596261dcdec91f22c5cf1'
          }
        ]

        const tokens = [
          {
            amount: new BigNumber(1),
            shouldSendAll: false,
            token: {
              identifier:
                '4a8e145beaee9764aa956633a68ea3d2e69e75736f48ed9e82441097.54657374746f6b656e',
              isDefault: false,
              networkId: 300
            }
          },
          {
            amount: new BigNumber(1481480),
            shouldSendAll: undefined,
            token: {
              identifier: '',
              isDefault: true,
              networkId: 300
            }
          }
        ] as Array<SendToken>

        const params = buildDummyTxParameters(false)

        const unsignedTx = await yoroiLib.createUnsignedTx(
          params.absSlotNumber,
          utxos,
          params.receiver,
          params.changeAddress,
          tokens,
          params.config,
          params.defaultToken,
          {}
        )

        expect(unsignedTx.totalInput.values.length).to.equal(2)

        expect(unsignedTx.totalInput.values[0].identifier).to.equal('')
        expect(unsignedTx.totalInput.values[0].networkId).to.equal(300)
        expect(unsignedTx.totalInput.values[0].amount.toString()).to.equal(
          unsignedTx.totalOutput.values[0].amount
            .plus(unsignedTx.fee.values[0].amount)
            .minus(unsignedTx.change[0].values.values[0].amount)
            .toString()
        )
        expect(unsignedTx.totalInput.values[0].amount.toString()).to.equal(
          unsignedTx.inputs
            .reduce((prev, curr) => {
              return prev.plus(curr.value.values[0].amount)
            }, new BigNumber('0'))
            .minus(unsignedTx.change[0].values.values[0].amount)
            .toString()
        )
        expect(unsignedTx.totalInput.values[0].amount.toString()).to.equal(
          unsignedTx.outputs
            .reduce((prev, curr) => {
              return prev.plus(curr.value.values[0].amount)
            }, new BigNumber('0'))
            .plus(unsignedTx.fee.values[0].amount)
            .minus(unsignedTx.change[0].values.values[0].amount)
            .toString()
        )
        expect(unsignedTx.totalOutput.values[0].amount.toString()).to.equal(
          unsignedTx.outputs
            .reduce((prev, curr) => {
              return prev.plus(curr.value.values[0].amount)
            }, new BigNumber('0'))
            .toString()
        )
        expect(
          unsignedTx.outputs[0].value.values[0].amount.toString()
        ).to.equal(
          unsignedTx.totalInput.values[0].amount
            .minus(unsignedTx.fee.values[0].amount)
            .toString()
        )

        expect(unsignedTx.totalInput.values[1].identifier).to.equal(
          '4a8e145beaee9764aa956633a68ea3d2e69e75736f48ed9e82441097.54657374746f6b656e'
        )
        expect(unsignedTx.totalInput.values[1].networkId).to.equal(300)
        expect(unsignedTx.totalInput.values[1].amount.toString()).to.equal('1')

        expect(unsignedTx.outputs.length).to.equal(2)
        expect(unsignedTx.change.length).to.equal(1)

        const keyLevel = 0
        const privateKey =
          'e8c9a059f04a369553df01e4ed8717a97c3cdf2e51e14292e96b8509db8a0442299023959cc6fe889b3f1af85512bb75215ded32e99f0c7f55d9b64629c6efcf9c46e83bf190f51db20951ed451b4f51d10e26df3318d8c3394e65e485567c09'
        const stakingKeyWits = new Set<string>()

        await unsignedTx.sign(keyLevel, privateKey, stakingKeyWits, [])
      }).timeout(100000)

      it('should build and sign TX for sending all balance', async () => {
        const params = buildDummyTxParameters(true)

        const unsignedTx = await yoroiLib.createUnsignedTx(
          params.absSlotNumber,
          params.utxos,
          params.receiver,
          params.changeAddress,
          params.tokens,
          params.config,
          params.defaultToken,
          {}
        )

        const keyLevel = 0
        const privateKey =
          'e8c9a059f04a369553df01e4ed8717a97c3cdf2e51e14292e96b8509db8a0442299023959cc6fe889b3f1af85512bb75215ded32e99f0c7f55d9b64629c6efcf9c46e83bf190f51db20951ed451b4f51d10e26df3318d8c3394e65e485567c09'
        const stakingKeyWits = new Set<string>()

        await unsignedTx.sign(keyLevel, privateKey, stakingKeyWits, [])

        expect(unsignedTx.outputs.length).to.equal(1)
        expect(unsignedTx.change.length).to.equal(0)
      }).timeout(100000)
    })

    describe('delegation', () => {
      const utxos = [
        {
          amount: '10000000',
          receiver:
            '0085abf3eca55024aa1c22b944599b5e890ec12dfb19941229da4ba293c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'ac6ee8b594effcd10120e254125297045ac5986fb574a6801724d2f8c32541fc',
          txIndex: 0,
          utxoId:
            'ac6ee8b594effcd10120e254125297045ac5986fb574a6801724d2f8c32541fc0',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 0, 0],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '3346032132',
          receiver:
            '0085abf3eca55024aa1c22b944599b5e890ec12dfb19941229da4ba293c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'ac6ee8b594effcd10120e254125297045ac5986fb574a6801724d2f8c32541fc',
          txIndex: 1,
          utxoId:
            'ac6ee8b594effcd10120e254125297045ac5986fb574a6801724d2f8c32541fc1',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 0, 0],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '5250824',
          receiver:
            '00d98c91b12362c149ffde44cbd92be5133a23d9aa8022ff706d3e52cfc3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '612942dec077657f308926f71272635692be3ddb7dc60fee12398b1a9b70a268',
          txIndex: 3,
          utxoId:
            '612942dec077657f308926f71272635692be3ddb7dc60fee12398b1a9b70a2683',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 398],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '7314825',
          receiver:
            '000958da4e2f346fecb55c63805eab1c316e013e040b03f357bf6884f5c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'd0206c6ec8d865172dfd449c499557fc09c6efd270072352cae906029b77bbc5',
          txIndex: 1,
          utxoId:
            'd0206c6ec8d865172dfd449c499557fc09c6efd270072352cae906029b77bbc51',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 402],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '1344798',
          receiver:
            '00e7cd552f7d6e32cd98d398fee342cff1d2d7ecd5cb858123888e4b7bc3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '82f2b1ddc335221eb452469d076750797bb5110fd1111245b0510317d984f18f',
          txIndex: 0,
          utxoId:
            '82f2b1ddc335221eb452469d076750797bb5110fd1111245b0510317d984f18f0',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 0, 115],
            startLevel: 1
          },
          assets: [
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.563432',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '563432'
            }
          ]
        },
        {
          amount: '1344798',
          receiver:
            '00050fe9a19a006dbda227964a308806c6c18adbcd01de533fa81c4563c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '82f2b1ddc335221eb452469d076750797bb5110fd1111245b0510317d984f18f',
          txIndex: 1,
          utxoId:
            '82f2b1ddc335221eb452469d076750797bb5110fd1111245b0510317d984f18f1',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 403],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '1724100',
          receiver:
            '00050fe9a19a006dbda227964a308806c6c18adbcd01de533fa81c4563c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '82f2b1ddc335221eb452469d076750797bb5110fd1111245b0510317d984f18f',
          txIndex: 2,
          utxoId:
            '82f2b1ddc335221eb452469d076750797bb5110fd1111245b0510317d984f18f2',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 403],
            startLevel: 1
          },
          assets: [
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423323339363338333835',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423323339363338333835'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423323439363735333032',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423323439363735333032'
            },
            {
              amount: '12',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.775348494241',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '775348494241'
            }
          ]
        },
        {
          amount: '7198819',
          receiver:
            '00050fe9a19a006dbda227964a308806c6c18adbcd01de533fa81c4563c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '82f2b1ddc335221eb452469d076750797bb5110fd1111245b0510317d984f18f',
          txIndex: 3,
          utxoId:
            '82f2b1ddc335221eb452469d076750797bb5110fd1111245b0510317d984f18f3',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 403],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '1000000',
          receiver:
            '00dec98f093b9b5832c91bdac73b9d82455913d2b21a558b44957821a9c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '991d9783ab17b01844b849de229bd9a8010d6a838b84afb58f864f4e70d23567',
          txIndex: 5,
          utxoId:
            '991d9783ab17b01844b849de229bd9a8010d6a838b84afb58f864f4e70d235675',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 390],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '387000000',
          receiver:
            '00f1588be1771ffc5f31e96857acac80d26d3e7c5da68af5e34ac9c192c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'c4607e3f38d89b56d4a171e0c6b4cf6a0f6f481fda3c9384570e86d7a8c7266c',
          txIndex: 0,
          utxoId:
            'c4607e3f38d89b56d4a171e0c6b4cf6a0f6f481fda3c9384570e86d7a8c7266c0',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 0, 165],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '1344798',
          receiver:
            '0096de3dcea9079c420e113fdebca94fec92c1bde2e182ea20061502a9c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '302b813839c83d5e8bddf74b004fe3bda1cdf5e7637f2158c9b516db39253903',
          txIndex: 0,
          utxoId:
            '302b813839c83d5e8bddf74b004fe3bda1cdf5e7637f2158c9b516db392539030',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 0, 173],
            startLevel: 1
          },
          assets: [
            {
              amount: '98',
              assetId:
                '2a0879034f23ea48ba28dc1c15b056bd63b8cf0cab9733da92add22f.414441524e',
              policyId:
                '2a0879034f23ea48ba28dc1c15b056bd63b8cf0cab9733da92add22f',
              name: '414441524e'
            }
          ]
        },
        {
          amount: '1000000000',
          receiver:
            '002053fa175042b71b3c22c5a2bc413c7b379383bdf4d5be944899af18c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '91bed83dc5c3c6f3b854115a2858f421816fb4676e348aec5c5de374caccc505',
          txIndex: 0,
          utxoId:
            '91bed83dc5c3c6f3b854115a2858f421816fb4676e348aec5c5de374caccc5050',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 0, 175],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '11036744',
          receiver:
            '00edd1d06d2579bfecd4faa0e722166a8944404dc1264cabffef214b60c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'c93248ceea6bdeee008620566afdd5165bcc972ffd4692742e5c505c6b7b7ca7',
          txIndex: 4,
          utxoId:
            'c93248ceea6bdeee008620566afdd5165bcc972ffd4692742e5c505c6b7b7ca74',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 394],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '1413762',
          receiver:
            '00fd68f09f215d1e38f2ceab2cee228c8f7c662953ee591a919b1a5f7fc3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'b2b883a631ffb07010579476228206a528e64f23be296cdcc69f9e12a5e7768a',
          txIndex: 1,
          utxoId:
            'b2b883a631ffb07010579476228206a528e64f23be296cdcc69f9e12a5e7768a1',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 397],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '1000000',
          receiver:
            '009844a7ba151fc6ad7c87da6e0258e14edad943ce13a1d50fd266de24c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '64297b47ffed0a88a7317d94da22b93e9482265d0c32c8d4805a67b8f7934fec',
          txIndex: 0,
          utxoId:
            '64297b47ffed0a88a7317d94da22b93e9482265d0c32c8d4805a67b8f7934fec0',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 399],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '2000000',
          receiver:
            '009844a7ba151fc6ad7c87da6e0258e14edad943ce13a1d50fd266de24c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '64297b47ffed0a88a7317d94da22b93e9482265d0c32c8d4805a67b8f7934fec',
          txIndex: 1,
          utxoId:
            '64297b47ffed0a88a7317d94da22b93e9482265d0c32c8d4805a67b8f7934fec1',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 399],
            startLevel: 1
          },
          assets: [
            {
              amount: '42',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.563432',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '563432'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423333132353133303737',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423333132353133303737'
            }
          ]
        },
        {
          amount: '1379280',
          receiver:
            '009844a7ba151fc6ad7c87da6e0258e14edad943ce13a1d50fd266de24c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '64297b47ffed0a88a7317d94da22b93e9482265d0c32c8d4805a67b8f7934fec',
          txIndex: 2,
          utxoId:
            '64297b47ffed0a88a7317d94da22b93e9482265d0c32c8d4805a67b8f7934fec2',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 399],
            startLevel: 1
          },
          assets: [
            {
              amount: '1',
              assetId:
                '0f49d5234bcdb3a8333d1292c979c4d309f2f1966b29362e95215272.486973746f7269616e',
              policyId:
                '0f49d5234bcdb3a8333d1292c979c4d309f2f1966b29362e95215272',
              name: '486973746f7269616e'
            }
          ]
        },
        {
          amount: '7241220',
          receiver:
            '0049ba0cbd5ecf88c40591f44f162274b8900534f16b42c317f173320cc3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '64297b47ffed0a88a7317d94da22b93e9482265d0c32c8d4805a67b8f7934fec',
          txIndex: 3,
          utxoId:
            '64297b47ffed0a88a7317d94da22b93e9482265d0c32c8d4805a67b8f7934fec3',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 400],
            startLevel: 1
          },
          assets: [
            {
              amount: '965',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.563432',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '563432'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423313338363731313430',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423313338363731313430'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e4654233237373137333030',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e4654233237373137333030'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423333138343530383132',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423333138343530383132'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423343437343434313132',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423343437343434313132'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e4654233437333830303438',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e4654233437333830303438'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423343934323038393131',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423343934323038393131'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423363030383837393731',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423363030383837393731'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423363130373233333232',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423363130373233333232'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423363731343234303237',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423363731343234303237'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e4654233637313934313335',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e4654233637313934313335'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423373234303037373735',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423373234303037373735'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423373339333333303239',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423373339333333303239'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423373436393933323738',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423373436393933323738'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e4654233739373536313837',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e4654233739373536313837'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423383137353339363331',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423383137353339363331'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423383634373434393433',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423383634373434393433'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423383838323538353138',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423383838323538353138'
            },
            {
              amount: '1',
              assetId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8.5634322f4e465423393733383432343935',
              policyId:
                '4d99f2fcc2fd91aca97865516b8e77a8e6dc011a905b9960289833e8',
              name: '5634322f4e465423393733383432343935'
            },
            {
              amount: '12411',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.7741564158',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '7741564158'
            },
            {
              amount: '88',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77424e42',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '77424e42'
            },
            {
              amount: '10000',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77425443',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '77425443'
            },
            {
              amount: '5300000',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77444f4745',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '77444f4745'
            },
            {
              amount: '38610',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77444f54',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '77444f54'
            },
            {
              amount: '11471',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77455448',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '77455448'
            },
            {
              amount: '18000',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.774c554e41',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '774c554e41'
            },
            {
              amount: '999988',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.775348494241',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '775348494241'
            },
            {
              amount: '1000000',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.7755534443',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '7755534443'
            },
            {
              amount: '1000000',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.7755534454',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '7755534454'
            },
            {
              amount: '2296120',
              assetId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77585250',
              policyId:
                '648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198',
              name: '77585250'
            },
            {
              amount: '1',
              assetId:
                '6a870e1520454de3b2073e2835186095ad9ebaa4145a31c0482fefe8.416461',
              policyId:
                '6a870e1520454de3b2073e2835186095ad9ebaa4145a31c0482fefe8',
              name: '416461'
            },
            {
              amount: '1',
              assetId:
                '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7.',
              policyId:
                '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7',
              name: ''
            },
            {
              amount: '1',
              assetId:
                'a4b125936997e4d11a5ae7b775cc22ea8d41a426dab84f1d9794a9bf.4461727468',
              policyId:
                'a4b125936997e4d11a5ae7b775cc22ea8d41a426dab84f1d9794a9bf',
              name: '4461727468'
            },
            {
              amount: '462',
              assetId:
                'a8eb0d5a1126e6e60bbe532f13a3e4a2d5a7618dcae7946fcb74f4d0.563432',
              policyId:
                'a8eb0d5a1126e6e60bbe532f13a3e4a2d5a7618dcae7946fcb74f4d0',
              name: '563432'
            },
            {
              amount: '1',
              assetId:
                'a8eb0d5a1126e6e60bbe532f13a3e4a2d5a7618dcae7946fcb74f4d0.5634322f4e465423313632373936353938',
              policyId:
                'a8eb0d5a1126e6e60bbe532f13a3e4a2d5a7618dcae7946fcb74f4d0',
              name: '5634322f4e465423313632373936353938'
            },
            {
              amount: '1',
              assetId:
                'a8eb0d5a1126e6e60bbe532f13a3e4a2d5a7618dcae7946fcb74f4d0.5634322f4e465423323636323234353939',
              policyId:
                'a8eb0d5a1126e6e60bbe532f13a3e4a2d5a7618dcae7946fcb74f4d0',
              name: '5634322f4e465423323636323234353939'
            },
            {
              amount: '1',
              assetId:
                'b5ee36b296fb3b45984466112165003cbe47c1da85c649ee1434da0e.457965',
              policyId:
                'b5ee36b296fb3b45984466112165003cbe47c1da85c649ee1434da0e',
              name: '457965'
            },
            {
              amount: '1',
              assetId:
                'c7767778da94ffac420b5d5edf39fecbed7a38d238723a8be0ace5f9.436f6e6e656374696f6e',
              policyId:
                'c7767778da94ffac420b5d5edf39fecbed7a38d238723a8be0ace5f9',
              name: '436f6e6e656374696f6e'
            },
            {
              amount: '45000000',
              assetId:
                'c85f714f2187021c7bab53741f659d0c5b1a6e7529d32b7794ff051c.474f4c44',
              policyId:
                'c85f714f2187021c7bab53741f659d0c5b1a6e7529d32b7794ff051c',
              name: '474f4c44'
            },
            {
              amount: '1',
              assetId:
                'c868cdb63090661d815bac251aad5fcffaef94cf099e6cd81df33490.474f4c44',
              policyId:
                'c868cdb63090661d815bac251aad5fcffaef94cf099e6cd81df33490',
              name: '474f4c44'
            },
            {
              amount: '1',
              assetId:
                'ce089738e65d10e105a0f63163df80ed2542b050c51f054074dfe3bc.53637265656e73686f7431',
              policyId:
                'ce089738e65d10e105a0f63163df80ed2542b050c51f054074dfe3bc',
              name: '53637265656e73686f7431'
            },
            {
              amount: '1',
              assetId:
                'd16ccb791ed2dc5afc810ac4c4cd125ccbb9369506629dc05cfa76b6.737461636b636861696e',
              policyId:
                'd16ccb791ed2dc5afc810ac4c4cd125ccbb9369506629dc05cfa76b6',
              name: '737461636b636861696e'
            },
            {
              amount: '980000',
              assetId:
                'd1fd2f6f2cb7ed15b3d535567ff3bd621b50550d261adedc2a48da62.524e43',
              policyId:
                'd1fd2f6f2cb7ed15b3d535567ff3bd621b50550d261adedc2a48da62',
              name: '524e43'
            },
            {
              amount: '4500000000000',
              assetId:
                'd27197682d71905c087c5c3b61b10e6d746db0b9bef351014d75bb26.6e69636f696e',
              policyId:
                'd27197682d71905c087c5c3b61b10e6d746db0b9bef351014d75bb26',
              name: '6e69636f696e'
            },
            {
              amount: '1',
              assetId:
                'd6312282ee9db69267aa6cc1c1dda85266120f721d65513175db7870.625f30305f625f35',
              policyId:
                'd6312282ee9db69267aa6cc1c1dda85266120f721d65513175db7870',
              name: '625f30305f625f35'
            }
          ]
        },
        {
          amount: '2000000',
          receiver:
            '0044051a28a04d26312b72a34baa26623a488b8a990831044c372abf30c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'f8c1e92c2262106618c98dcf068a14301814a2740d5c65016f0dc966174c631f',
          txIndex: 1,
          utxoId:
            'f8c1e92c2262106618c98dcf068a14301814a2740d5c65016f0dc966174c631f1',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 396],
            startLevel: 1
          },
          assets: [
            {
              amount: '1',
              assetId:
                'e155e45fc57506872b85daad2827d99aba69e5bc96afb7cea925ef1e.4e65757472616c',
              policyId:
                'e155e45fc57506872b85daad2827d99aba69e5bc96afb7cea925ef1e',
              name: '4e65757472616c'
            }
          ]
        },
        {
          amount: '1000000',
          receiver:
            '00aa74b0502b2832d68a3751c52178f687e5d5ee67ad8dd91516494811c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '79043bb3317a0536fe5aac49c2489d8a97c871e899800eee76958340760d0f29',
          txIndex: 0,
          utxoId:
            '79043bb3317a0536fe5aac49c2489d8a97c871e899800eee76958340760d0f290',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 0, 177],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '1648307',
          receiver:
            '00315650d66fafb48822d9463144915427e6334ea38b7d5c9e6199b0acc3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            '79043bb3317a0536fe5aac49c2489d8a97c871e899800eee76958340760d0f29',
          txIndex: 1,
          utxoId:
            '79043bb3317a0536fe5aac49c2489d8a97c871e899800eee76958340760d0f291',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 405],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '1000000',
          receiver:
            '00386744969a151572774d487bb8d73b2cc9d7d1392768f7340c8e1cb2c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'de7c0b8133908eb396161c6cd413c1a54dd35a9542831299e21f094216c51e2c',
          txIndex: 0,
          utxoId:
            'de7c0b8133908eb396161c6cd413c1a54dd35a9542831299e21f094216c51e2c0',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 0, 178],
            startLevel: 1
          },
          assets: []
        },
        {
          amount: '16241712',
          receiver:
            '00208d4957f9bd416342924c82466d74b752952cb0f93f7df91fae4b9ac3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
          txHash:
            'de7c0b8133908eb396161c6cd413c1a54dd35a9542831299e21f094216c51e2c',
          txIndex: 1,
          utxoId:
            'de7c0b8133908eb396161c6cd413c1a54dd35a9542831299e21f094216c51e2c1',
          addressing: {
            path: [2147485500, 2147485463, 2147483648, 1, 406],
            startLevel: 1
          },
          assets: []
        }
      ]

      const accountState = {
        e0c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e: {
          remainingAmount: '250916',
          remainingNonSpendableAmount: '0',
          rewards: '9511672',
          withdrawals: '9260756',
          poolOperator: null,
          isRewardsOff: true
        }
      }

      const changeAddr = {
        address:
          '001c589b0d01c11c98abc49533c30bae1ec665912c95c915a217d75234c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
        addressing: {
          path: [2147485500, 2147485463, 2147483648, 1, 407],
          startLevel: 1
        }
      }

      describe('createUnsignedWithdrawalTx', () => {
        const getWithdrawalRequest = (shouldDeregister: boolean) => {
          return [
            {
              addressing: {
                path: [2147485500, 2147485463, 2147483648, 2, 0],
                startLevel: 1
              },
              rewardAddress:
                'e0c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
              shouldDeregister
            }
          ]
        }

        it('should build and sign withdrawal request', async () => {
          const unsignedWithdrawalTx =
            await yoroiLib.createUnsignedWithdrawalTx(
              accountState,
              absSlotNumber,
              utxos,
              getWithdrawalRequest(false),
              changeAddr,
              cardanoConfig,
              {}
            )

          await unsignedWithdrawalTx.sign(
            0,
            '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
            new Set<string>([]),
            []
          )
        }).timeout(100000)

        it('should build and sign withdrawal request with deregistration', async () => {
          const unsignedWithdrawalTx =
            await yoroiLib.createUnsignedWithdrawalTx(
              accountState,
              absSlotNumber,
              utxos,
              getWithdrawalRequest(true),
              changeAddr,
              cardanoConfig,
              {}
            )

          await unsignedWithdrawalTx.sign(
            0,
            '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
            new Set<string>([]),
            []
          )

          expect(unsignedWithdrawalTx.deregistrations.length).to.equal(1)
          expect(await unsignedWithdrawalTx.certificates.len()).to.equal(1)
        }).timeout(100000)
      })

      describe('createUnsignedDelegationTx', () => {
        it('should build and sign delegation TX', async () => {
          const privateKey = await yoroiLib.Wasm.Bip32PrivateKey.fromBytes(
            Buffer.from(
              '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
              'hex'
            )
          )
          const publicKey = await privateKey.toPublic()
          const stakingKey = await publicKey
            .derive(2)
            .then((x) => x.derive(0))
            .then((x) => x.toRawKey())

          const response = await yoroiLib.createUnsignedDelegationTx(
            absSlotNumber,
            utxos,
            stakingKey,
            false,
            '3921f4441153e5936910de57cb1982dfbaa781a57ba1ff97b3fd869e',
            changeAddr,
            {
              defaults: {
                isDefault: true,
                identifier: '',
                networkId: 300
              },
              values: [
                {
                  amount: new BigNumber('10000000'),
                  identifier: '',
                  networkId: 300
                }
              ]
            },
            {
              isDefault: true,
              identifier: '',
              networkId: 300
            },
            {},
            cardanoConfig
          )

          await response.unsignedTx.sign(
            0,
            '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
            new Set<string>([]),
            []
          )
        }).timeout(10000)
      })
    })

    describe('createUnsignedVotingTx', () => {
      it('should build and sign voting request', async () => {
        const params = buildDummyTxParameters(false)

        const pk = await yoroiLib.Wasm.Bip32PrivateKey.fromBytes(
          Buffer.from(
            '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
            'hex'
          )
        )

        const unsignedVotingTx = await yoroiLib.createUnsignedVotingTx(
          params.absSlotNumber,
          await pk.toRawKey(),
          [2147485500, 2147485463, 2147483648, 0, 3],
          await pk.toRawKey(),
          params.utxos,
          params.changeAddress,
          params.config,
          {},
          5
        )

        await unsignedVotingTx.sign(
          0,
          '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
          new Set<string>([]),
          []
        )
      }).timeout(100000)
    })

    describe('Iteratables', () => {
      it('should iterate over RewardAddresses', async () => {
        const getRewardAddress = async () => {
          const mainnet = await yoroiLib.Wasm.NetworkInfo.mainnet()

          const privKey =
            await yoroiLib.Wasm.Bip32PrivateKey.generateEd25519Bip32()
          const pubKey = await privKey.toPublic()
          const stakeCredential =
            await yoroiLib.Wasm.StakeCredential.fromKeyhash(
              await pubKey.toRawKey().then((x) => x.hash())
            )
          const rewardAddress = yoroiLib.Wasm.RewardAddress.new(
            await mainnet.networkId(),
            stakeCredential
          )

          return rewardAddress
        }

        const rewardAddresses = await yoroiLib.Wasm.RewardAddresses.new()
        rewardAddresses.add(await getRewardAddress())
        rewardAddresses.add(await getRewardAddress())
        rewardAddresses.add(await getRewardAddress())

        const rewardAddressesArray = [] as RewardAddress[]
        for await (const rewardAddress of rewardAddresses) {
          rewardAddressesArray.push(rewardAddress)
        }

        expect(rewardAddressesArray.length).to.equal(
          await rewardAddresses.len()
        )
        expect(
          await rewardAddressesArray[0].toAddress().then((a) => a.toBech32())
        ).to.equal(
          await rewardAddresses
            .get(0)
            .then((a) => a.toAddress())
            .then((a) => a.toBech32())
        )
        expect(
          await rewardAddressesArray[1].toAddress().then((a) => a.toBech32())
        ).to.equal(
          await rewardAddresses
            .get(1)
            .then((a) => a.toAddress())
            .then((a) => a.toBech32())
        )
        expect(
          await rewardAddressesArray[2].toAddress().then((a) => a.toBech32())
        ).to.equal(
          await rewardAddresses
            .get(2)
            .then((a) => a.toAddress())
            .then((a) => a.toBech32())
        )
      }).timeout(100000)
    })

    describe('Ledger', () => {
      it.only('should build Ledger payload for signing TX', async () => {
        const params = buildDummyTxParameters(false)

        const pk = await yoroiLib.Wasm.Bip32PrivateKey.fromBytes(
          Buffer.from(
            '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
            'hex'
          )
        )

        const unsignedVotingTx = await yoroiLib.createUnsignedVotingTx(
          params.absSlotNumber,
          await pk.toRawKey(),
          [2147485500, 2147485463, 2147483648, 0, 3],
          await pk.toRawKey(),
          params.utxos,
          params.changeAddress,
          params.config,
          {},
          5
        )

        await yoroiLib.buildLedgerPayload(
          unsignedVotingTx,
          cardanoConfig.networkId,
          2,
          (_) => ({
            path: [2147485500, 2147485463, 2147483648, 0, 3],
            startLevel: 0
          })
        )
      })
    })
  })
}
