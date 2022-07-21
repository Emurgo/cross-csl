import { BigNumber } from 'bignumber.js'
import { expect } from 'chai'
import {
  AddressingAddress,
  CardanoAddressedUtxo,
  CardanoHaskellConfig,
  Token,
  IYoroiLib,
  SendToken,
  RegistrationStatus
} from '../src'
import {
  GeneralTransactionMetadata,
} from '../src/internals/wasm-contract'

/*
  These tests were useful to start building the initial setup, but as we add the actual
  behavioral tests on the YoroiLib, we will probably discard the tests we have now
  and keep only the tests that test Yoroi-Lib directly, as they will already cover the
  testing of the WASM proxies
*/

const defaultToken = {
  identifier: '',
  networkId: 300,
  isDefault: true
} as Token

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

      const changeAddr = {
        address:
          '001c589b0d01c11c98abc49533c30bae1ec665912c95c915a217d75234c3892366f174a76af9252f78368f5747d3055ab3568ea3b6bf40b01e',
        addressing: {
          path: [2147485500, 2147485463, 2147483648, 1, 407],
          startLevel: 1
        }
      }

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

          const unsignedTx = await yoroiLib.createUnsignedDelegationTx(
            absSlotNumber,
            utxos,
            stakingKey,
            RegistrationStatus.RegisterAndDelegate,
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

          await unsignedTx.sign(
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
          defaultToken,
          await pk.toPublic().then(p => p.toRawKey()),
          [2147485500, 2147485463, 2147483648, 0, 3],
          await pk.toPublic().then(p => p.toRawKey()),
          params.utxos,
          params.changeAddress,
          params.config,
          {},
          5,
          (hashedMeta) => pk.toRawKey().then(k => k.sign(hashedMeta)).then(x => x.toHex())
        )

        await unsignedVotingTx.sign(
          0,
          '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
          new Set<string>([]),
          []
        )
      }).timeout(100000)
    })

    describe('withdrawal', () => {
      it('should work', async () => {
        const accountPrivateKey = "408a1cb637d615c49e8696c30dd54883302a20a7b9b8a9d1c307d2ed3cd50758c9402acd000461a8fc0f25728666e6d3b86d031b8eea8d2f69b21e8aa6ba2b153e3ec212cc8a36ed9860579dfe1e3ef4d6de778c5dbdd981623b48727cd96247"

        const accountState = {
          e0acab7e493ece4c1e6ae627ef9f5f7c9b1063e599e4aa91f87f0d58ae: {
            remainingAmount: '8653580',
            remainingNonSpendableAmount: '0',
            rewards: '16929809',
            withdrawals: '8276229',
            poolOperator: null,
            isRewardsOff: true,
          },
        }

        const defaultAsset = {
          networkId: 300,
          identifier: '',
          isDefault: true,
          metadata: {
            type: 'Cardano',
            policyId: '',
            assetName: '',
            ticker: 'TADA',
            longName: null,
            numberOfDecimals: 6,
            maxSupply: '45000000000000000',
          },
        }

        const withdrawalInfo = [
          {
            addressing: {
              path: [2147485500, 2147485463, 2147483648, 2, 0],
              startLevel: 1,
            },
            rewardAddress: 'e0acab7e493ece4c1e6ae627ef9f5f7c9b1063e599e4aa91f87f0d58ae',
            shouldDeregister: true,
            stakingPrivateKey: await yoroiLib.Wasm.Bip32PrivateKey.fromBytes(
              Buffer.from(accountPrivateKey, 'hex')
            ).then(x => x.derive(2147485500))
            .then(x => x.derive(2147485463))
            .then(x => x.derive(0))
            .then(x => x.derive(2))
            .then(x => x.derive(0))
            .then(x => x.toRawKey())
          },
        ]

        const changeAddr = {
          address: "0032d20674eb8b0d47b256898890f75140aeaed1c48bad05e34fbcc32cacab7e493ece4c1e6ae627ef9f5f7c9b1063e599e4aa91f87f0d58ae",
          addressing: {
            path: [147485500, 2147485463, 2147483648, 1, 239], 
            startLevel: 1
          }
        }

        const addressedUtxos = [
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                1,
                233
              ],
              "startLevel": 1
            },
            "txIndex": 3,
            "txHash": "8628eb1595bec18f4140570d2444b13d72bf5a295d3ea87f5ebf4505bfe70138",
            "amount": "1000000",
            "receiver": "addr_test1qp4n0gtr3hu5em259hjjmdtum8vq6v28qaq3g4gm0mccqv9v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhq8y4gnj",
            "utxoId": "8628eb1595bec18f4140570d2444b13d72bf5a295d3ea87f5ebf4505bfe70138:3",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                1,
                233
              ],
              "startLevel": 1
            },
            "txIndex": 5,
            "txHash": "8628eb1595bec18f4140570d2444b13d72bf5a295d3ea87f5ebf4505bfe70138",
            "amount": "1000000",
            "receiver": "addr_test1qp4n0gtr3hu5em259hjjmdtum8vq6v28qaq3g4gm0mccqv9v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhq8y4gnj",
            "utxoId": "8628eb1595bec18f4140570d2444b13d72bf5a295d3ea87f5ebf4505bfe70138:5",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                1,
                234
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "2cb3ed44ad07d41c2c2b1dd0a98faacf60d8e3a8fa4ae5e069db94a9edb52c2a",
            "amount": "11413542",
            "receiver": "addr_test1qpur47kwfqprlmns2wrekamc2d4qkmgqjr3pzunkf7hlkv4v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqacm7rx",
            "utxoId": "2cb3ed44ad07d41c2c2b1dd0a98faacf60d8e3a8fa4ae5e069db94a9edb52c2a:2",
            "assets": [
              {
                "assetId": "08d91ec4e6c743a92de97d2fde5ca0d81493555c535894a3097061f7.c8b0",
                "policyId": "08d91ec4e6c743a92de97d2fde5ca0d81493555c535894a3097061f7",
                "name": "c8b0",
                "amount": "148"
              },
              {
                "assetId": "16af70780a170994e8e5e575f4401b1d89bddf7d1a11d6264e0b0c85.74426967546f6b656e4e616d653132",
                "policyId": "16af70780a170994e8e5e575f4401b1d89bddf7d1a11d6264e0b0c85",
                "name": "74426967546f6b656e4e616d653132",
                "amount": "1149"
              },
              {
                "assetId": "17eb5925c69a2b88cada90d7e07eb3fcf19c2f41b66697820fc77231.74426967546f6b656e4e616d653135",
                "policyId": "17eb5925c69a2b88cada90d7e07eb3fcf19c2f41b66697820fc77231",
                "name": "74426967546f6b656e4e616d653135",
                "amount": "1149"
              },
              {
                "assetId": "1ca1fc0c880d25850cb00303788dfb51bdf2f902f6dce47d1ad09d5b.44",
                "policyId": "1ca1fc0c880d25850cb00303788dfb51bdf2f902f6dce47d1ad09d5b",
                "name": "44",
                "amount": "2463889379"
              },
              {
                "assetId": "1d129dc9c03f95a863489883914f05a52e13135994a32f0cbeacc65f.74484f444c52",
                "policyId": "1d129dc9c03f95a863489883914f05a52e13135994a32f0cbeacc65f",
                "name": "74484f444c52",
                "amount": "5"
              },
              {
                "assetId": "238c008ef8ead5ec20bab5733f765f897bb405c0ccb9f752d2194c0a.74426967546f6b656e4e616d653136",
                "policyId": "238c008ef8ead5ec20bab5733f765f897bb405c0ccb9f752d2194c0a",
                "name": "74426967546f6b656e4e616d653136",
                "amount": "1149"
              },
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e",
                "amount": "215410"
              },
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "179"
              },
              {
                "assetId": "3eb82f197734954a140faa953203e2454421832c4b00aff63a62459d.53544b",
                "policyId": "3eb82f197734954a140faa953203e2454421832c4b00aff63a62459d",
                "name": "53544b",
                "amount": "94"
              },
              {
                "assetId": "48664e8d76f2b15606677bd117a3eac9929c378ac547ed295518dfd5.74426967546f6b656e4e616d653032",
                "policyId": "48664e8d76f2b15606677bd117a3eac9929c378ac547ed295518dfd5",
                "name": "74426967546f6b656e4e616d653032",
                "amount": "1149"
              },
              {
                "assetId": "52366a9f74840bb47d0509393c18343f376250de1a01e0a43619e471.74426967546f6b656e4e616d653038",
                "policyId": "52366a9f74840bb47d0509393c18343f376250de1a01e0a43619e471",
                "name": "74426967546f6b656e4e616d653038",
                "amount": "1149"
              },
              {
                "assetId": "540fc78fe3097c41590b696a23844f8d0c9cf2a46328bb7b77b1c7a6.74426967546f6b656e4e616d653031",
                "policyId": "540fc78fe3097c41590b696a23844f8d0c9cf2a46328bb7b77b1c7a6",
                "name": "74426967546f6b656e4e616d653031",
                "amount": "1149"
              },
              {
                "assetId": "57575a1b17e61ade154b325dceca4c3cfe26b6f98f9b186d08583ada.66697368546f6b656e",
                "policyId": "57575a1b17e61ade154b325dceca4c3cfe26b6f98f9b186d08583ada",
                "name": "66697368546f6b656e",
                "amount": "133"
              },
              {
                "assetId": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522.4d494e54",
                "policyId": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522",
                "name": "4d494e54",
                "amount": "10840562"
              },
              {
                "assetId": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522.534245525259",
                "policyId": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522",
                "name": "534245525259",
                "amount": "3422266"
              },
              {
                "assetId": "6090278d9171cd5762f24e0a63f85fabb3db950fe9944f396ffa51a1.74426967546f6b656e4e616d653230",
                "policyId": "6090278d9171cd5762f24e0a63f85fabb3db950fe9944f396ffa51a1",
                "name": "74426967546f6b656e4e616d653230",
                "amount": "1149"
              },
              {
                "assetId": "648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77425443",
                "policyId": "648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198",
                "name": "77425443",
                "amount": "10000"
              },
              {
                "assetId": "648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77444f4745",
                "policyId": "648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198",
                "name": "77444f4745",
                "amount": "5300000"
              },
              {
                "assetId": "648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198.77455448",
                "policyId": "648823ffdad1610b4162f4dbc87bd47f6f9cf45d772ddef661eff198",
                "name": "77455448",
                "amount": "3260000"
              },
              {
                "assetId": "67ea41e56ef3f2c19765b8740c297a73048bc1615e5c537f0889d4a1.74426967546f6b656e4e616d653134",
                "policyId": "67ea41e56ef3f2c19765b8740c297a73048bc1615e5c537f0889d4a1",
                "name": "74426967546f6b656e4e616d653134",
                "amount": "1149"
              },
              {
                "assetId": "698a6ea0ca99f315034072af31eaac6ec11fe8558d3f48e9775aab9d.7444524950",
                "policyId": "698a6ea0ca99f315034072af31eaac6ec11fe8558d3f48e9775aab9d",
                "name": "7444524950",
                "amount": "51579527"
              },
              {
                "assetId": "6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7.",
                "policyId": "6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7",
                "name": "",
                "amount": "3"
              },
              {
                "assetId": "6d01f1c6f5ced9070db252fbf1fbd517f67e9e8966326205d4f0e5ea.74426967546f6b656e4e616d653131",
                "policyId": "6d01f1c6f5ced9070db252fbf1fbd517f67e9e8966326205d4f0e5ea",
                "name": "74426967546f6b656e4e616d653131",
                "amount": "1149"
              },
              {
                "assetId": "7312879acbb97007b89619c711749d4bbc51e365682daaa4f18d0759.4d696c6b6f6d656461466f6f626172",
                "policyId": "7312879acbb97007b89619c711749d4bbc51e365682daaa4f18d0759",
                "name": "4d696c6b6f6d656461466f6f626172",
                "amount": "5000009"
              },
              {
                "assetId": "783c70029a88a1575459215b648ab11d182bb1acc7d709aaabc02756.74426967546f6b656e4e616d653139",
                "policyId": "783c70029a88a1575459215b648ab11d182bb1acc7d709aaabc02756",
                "name": "74426967546f6b656e4e616d653139",
                "amount": "1149"
              },
              {
                "assetId": "819de34b4f37b6ae3743e37f16887cacf634a4e61f40d7f0b81e2017.74426967546f6b656e4e616d653039",
                "policyId": "819de34b4f37b6ae3743e37f16887cacf634a4e61f40d7f0b81e2017",
                "name": "74426967546f6b656e4e616d653039",
                "amount": "1149"
              },
              {
                "assetId": "8538fdebcdb68ecbf1fcfd8f2dcb478e04007e32a76047fdd86406da.74426967546f6b656e4e616d653137",
                "policyId": "8538fdebcdb68ecbf1fcfd8f2dcb478e04007e32a76047fdd86406da",
                "name": "74426967546f6b656e4e616d653137",
                "amount": "1149"
              },
              {
                "assetId": "8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772.4d4152454b",
                "policyId": "8c4662efcb7fd069c9e4003192b430e9e153e5c3e11099e3dab29772",
                "name": "4d4152454b",
                "amount": "633"
              },
              {
                "assetId": "9a7646844194fb7f71b72fe5310e26a0ae013b3916bb1a24e7066a5d.7441444f",
                "policyId": "9a7646844194fb7f71b72fe5310e26a0ae013b3916bb1a24e7066a5d",
                "name": "7441444f",
                "amount": "1000005"
              },
              {
                "assetId": "9e5f43a9e77e4ba2e5c5db37daee3ee0a78bc87cdea3c34f7f78523c.546f6b656e3131",
                "policyId": "9e5f43a9e77e4ba2e5c5db37daee3ee0a78bc87cdea3c34f7f78523c",
                "name": "546f6b656e3131",
                "amount": "1"
              },
              {
                "assetId": "a465391790543ecd0f9f769ea24afbfde07007baa782724735e085a8.74426967546f6b656e4e616d653036",
                "policyId": "a465391790543ecd0f9f769ea24afbfde07007baa782724735e085a8",
                "name": "74426967546f6b656e4e616d653036",
                "amount": "1149"
              },
              {
                "assetId": "a8eb0d5a1126e6e60bbe532f13a3e4a2d5a7618dcae7946fcb74f4d0.563432",
                "policyId": "a8eb0d5a1126e6e60bbe532f13a3e4a2d5a7618dcae7946fcb74f4d0",
                "name": "563432",
                "amount": "12"
              },
              {
                "assetId": "b940743438a9217ea9d673362f708e5080dcd7b597988ae962782e10.a121efa4cd9e6800567961ead9bbb8a1dee6412b0603441179f463ce915a9bd7",
                "policyId": "b940743438a9217ea9d673362f708e5080dcd7b597988ae962782e10",
                "name": "a121efa4cd9e6800567961ead9bbb8a1dee6412b0603441179f463ce915a9bd7",
                "amount": "16160784"
              },
              {
                "assetId": "bdbdd5dfd883c6c00765652910091a650a21dddb3758365831bb1771.74426967546f6b656e4e616d653138",
                "policyId": "bdbdd5dfd883c6c00765652910091a650a21dddb3758365831bb1771",
                "name": "74426967546f6b656e4e616d653138",
                "amount": "1149"
              },
              {
                "assetId": "c85f714f2187021c7bab53741f659d0c5b1a6e7529d32b7794ff051c.474f4c44",
                "policyId": "c85f714f2187021c7bab53741f659d0c5b1a6e7529d32b7794ff051c",
                "name": "474f4c44",
                "amount": "2418889379"
              },
              {
                "assetId": "c868cdb63090661d815bac251aad5fcffaef94cf099e6cd81df33490.474f4c44",
                "policyId": "c868cdb63090661d815bac251aad5fcffaef94cf099e6cd81df33490",
                "name": "474f4c44",
                "amount": "2463889378"
              },
              {
                "assetId": "ca757ea0352f38978a0c3737ca85f885eae4b8051cea1434a3b07f5b.74426967546f6b656e4e616d653133",
                "policyId": "ca757ea0352f38978a0c3737ca85f885eae4b8051cea1434a3b07f5b",
                "name": "74426967546f6b656e4e616d653133",
                "amount": "1149"
              },
              {
                "assetId": "ce3c3f372d4b277c3a583421bda2799a62b5b5105076b03d1e28b07b.53544b443130",
                "policyId": "ce3c3f372d4b277c3a583421bda2799a62b5b5105076b03d1e28b07b",
                "name": "53544b443130",
                "amount": "100"
              },
              {
                "assetId": "cfc398182e8197a6b39cf2db07a207866074dca9165c3c61c7972f5e.74426967546f6b656e4e616d653035",
                "policyId": "cfc398182e8197a6b39cf2db07a207866074dca9165c3c61c7972f5e",
                "name": "74426967546f6b656e4e616d653035",
                "amount": "1149"
              },
              {
                "assetId": "cfdff341e1f47450c9f3a347c6d6be2f2029c891a289fc041e8f956e.74426967546f6b656e4e616d653037",
                "policyId": "cfdff341e1f47450c9f3a347c6d6be2f2029c891a289fc041e8f956e",
                "name": "74426967546f6b656e4e616d653037",
                "amount": "1149"
              },
              {
                "assetId": "d27197682d71905c087c5c3b61b10e6d746db0b9bef351014d75bb26.6e69636f696e",
                "policyId": "d27197682d71905c087c5c3b61b10e6d746db0b9bef351014d75bb26",
                "name": "6e69636f696e",
                "amount": "30499999987788"
              },
              {
                "assetId": "d2e5d6dd927372b34b5da66cc7bee5dffd01351a49ac007efc9cea2d.74426967546f6b656e4e616d653034",
                "policyId": "d2e5d6dd927372b34b5da66cc7bee5dffd01351a49ac007efc9cea2d",
                "name": "74426967546f6b656e4e616d653034",
                "amount": "1149"
              },
              {
                "assetId": "d40ebd57f674645d5b1826bbbe3528280463cae8f82982586faa4592.74426967546f6b656e4e616d653130",
                "policyId": "d40ebd57f674645d5b1826bbbe3528280463cae8f82982586faa4592",
                "name": "74426967546f6b656e4e616d653130",
                "amount": "1149"
              },
              {
                "assetId": "e4214b7cce62ac6fbba385d164df48e157eae5863521b4b67ca71d86.438bb31d1920ad7fff1e0e93cab8a887eaa0b0c6754f578631f13389c3cdb0cd",
                "policyId": "e4214b7cce62ac6fbba385d164df48e157eae5863521b4b67ca71d86",
                "name": "438bb31d1920ad7fff1e0e93cab8a887eaa0b0c6754f578631f13389c3cdb0cd",
                "amount": "25867"
              },
              {
                "assetId": "e4214b7cce62ac6fbba385d164df48e157eae5863521b4b67ca71d86.60a585ee984a47140f7c201f238d48f89585d1a9f42687750626db3a906b050a",
                "policyId": "e4214b7cce62ac6fbba385d164df48e157eae5863521b4b67ca71d86",
                "name": "60a585ee984a47140f7c201f238d48f89585d1a9f42687750626db3a906b050a",
                "amount": "416592"
              },
              {
                "assetId": "e4214b7cce62ac6fbba385d164df48e157eae5863521b4b67ca71d86.86e90c911f058c3ebeb95a120eedd311caff3bb49d5b29ff8a9bad42005b041f",
                "policyId": "e4214b7cce62ac6fbba385d164df48e157eae5863521b4b67ca71d86",
                "name": "86e90c911f058c3ebeb95a120eedd311caff3bb49d5b29ff8a9bad42005b041f",
                "amount": "8613"
              },
              {
                "assetId": "e64e887a5311dccc5a20438415fdbfe4071277a4c2ad6d3d08f13da0.74426967546f6b656e4e616d653033",
                "policyId": "e64e887a5311dccc5a20438415fdbfe4071277a4c2ad6d3d08f13da0",
                "name": "74426967546f6b656e4e616d653033",
                "amount": "1149"
              },
              {
                "assetId": "ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db.",
                "policyId": "ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db",
                "name": "",
                "amount": "9"
              },
              {
                "assetId": "f0a74eb0e8ff819e4b15d30dac7d70ea05c639e33b285c7689bfe4a4.796f726f69546f6b656e",
                "policyId": "f0a74eb0e8ff819e4b15d30dac7d70ea05c639e33b285c7689bfe4a4",
                "name": "796f726f69546f6b656e",
                "amount": "50"
              },
              {
                "assetId": "f79b4211eef3839741ae9bf02ac75b112597510907bfaa100058e878.6d79546f6b656e",
                "policyId": "f79b4211eef3839741ae9bf02ac75b112597510907bfaa100058e878",
                "name": "6d79546f6b656e",
                "amount": "1"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                1,
                234
              ],
              "startLevel": 1
            },
            "txIndex": 3,
            "txHash": "2cb3ed44ad07d41c2c2b1dd0a98faacf60d8e3a8fa4ae5e069db94a9edb52c2a",
            "amount": "965246553",
            "receiver": "addr_test1qpur47kwfqprlmns2wrekamc2d4qkmgqjr3pzunkf7hlkv4v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqacm7rx",
            "utxoId": "2cb3ed44ad07d41c2c2b1dd0a98faacf60d8e3a8fa4ae5e069db94a9edb52c2a:3",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                1,
                235
              ],
              "startLevel": 1
            },
            "txIndex": 1,
            "txHash": "0ade895c9c3629ab55e312a42cd85a081cd1012a514c7928b2a51a697a0cf2a4",
            "amount": "10653342762",
            "receiver": "addr_test1qq8qdvjzuaa4eua33fmheqkq2lswwjz4a665wh470r333aav4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqr7k383",
            "utxoId": "0ade895c9c3629ab55e312a42cd85a081cd1012a514c7928b2a51a697a0cf2a4:1",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                1,
                236
              ],
              "startLevel": 1
            },
            "txIndex": 1,
            "txHash": "0371411f325d45b64b41f744ffa8462eb14d634a5d595cc836c066df82a627e4",
            "amount": "1309377",
            "receiver": "addr_test1qrgtn2h4g5mcqg4sr003gezr8d8vuzadsm0e44jpmlnsr74v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhq544upe",
            "utxoId": "0371411f325d45b64b41f744ffa8462eb14d634a5d595cc836c066df82a627e4:1",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                1,
                237
              ],
              "startLevel": 1
            },
            "txIndex": 1,
            "txHash": "1db9a594ccad11549eb738f256eb5ccf1d8b7aeb744a77ecce438c8e725bbc7d",
            "amount": "2949746",
            "receiver": "addr_test1qzx03feqg6lpgjzfqmglvwmz7sfssh79d920srq3583v8d9v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqk2y7hs",
            "utxoId": "1db9a594ccad11549eb738f256eb5ccf1d8b7aeb744a77ecce438c8e725bbc7d:1",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                1,
                238
              ],
              "startLevel": 1
            },
            "txIndex": 1,
            "txHash": "77e90131f07c0b78e352e4c7326cba796698f6ff0720956551044fbabb6baaf5",
            "amount": "12315952",
            "receiver": "addr_test1qzz7kzhgfwr496lv7w86mh75yh2p8r27w4hftnv7efqtzaav4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqy9uwxd",
            "utxoId": "77e90131f07c0b78e352e4c7326cba796698f6ff0720956551044fbabb6baaf5:1",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "f38a0bcb4e0383b7a8462d97a2211c11cb08617031b60b9c9f2a06fb08a736aa",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "f38a0bcb4e0383b7a8462d97a2211c11cb08617031b60b9c9f2a06fb08a736aa:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "2860425"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "7b52de3a2c8de63e65bbae1efe7cc40430b99b043664f2da8d5bab9b5c8f491b",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "7b52de3a2c8de63e65bbae1efe7cc40430b99b043664f2da8d5bab9b5c8f491b:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e",
                "amount": "191454"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "7398874faf30fec854f0061ca0ae6ba6477f89e0892a12408d5afef77a3a4438",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "7398874faf30fec854f0061ca0ae6ba6477f89e0892a12408d5afef77a3a4438:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "5717541"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "31929812d9c6d935254479840328e127811e747c9347beee45c548b93b00664a",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "31929812d9c6d935254479840328e127811e747c9347beee45c548b93b00664a:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "6288046"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 0,
            "txHash": "a095cbee12fb64bfcd6bf788eb540a331ea9de0f7774d37ea9434c131e06684a",
            "amount": "11000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "a095cbee12fb64bfcd6bf788eb540a331ea9de0f7774d37ea9434c131e06684a:0",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 1,
            "txHash": "6884b58cbd60488094f29e51be0b0d91dc73a614ae6390ffbc1579b486c57f50",
            "amount": "9997831507",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "6884b58cbd60488094f29e51be0b0d91dc73a614ae6390ffbc1579b486c57f50:1",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "f550bfbd8f21b870b0061599449af29652df0ea26b9bacc7a298e6b45bdc5e79",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "f550bfbd8f21b870b0061599449af29652df0ea26b9bacc7a298e6b45bdc5e79:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e",
                "amount": "209090"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 6,
            "txHash": "486d2404817dc9002957f3fb80f1bd0588314c0135d75624026289676e0581c5",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "486d2404817dc9002957f3fb80f1bd0588314c0135d75624026289676e0581c5:6",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "6201468"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "b352002b3f95aba3fbfdaed7e336b4bbf1ce13412ad878cb827a5980f662bde9",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "b352002b3f95aba3fbfdaed7e336b4bbf1ce13412ad878cb827a5980f662bde9:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "6054234"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "5a093fe48f8eaf1b6390ab292fe9d381c997b6dc0214642ba6617e887c9e49b1",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "5a093fe48f8eaf1b6390ab292fe9d381c997b6dc0214642ba6617e887c9e49b1:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e",
                "amount": "383015"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "c73421fc01cc0708fa3dd781a8eb3216f1a953a0e5d35a638e677e16cbbf20f8",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "c73421fc01cc0708fa3dd781a8eb3216f1a953a0e5d35a638e677e16cbbf20f8:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "6288685"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 0,
            "txHash": "35df8fac27554fca191b195febbf4503f5ceab0cba7f271009b034298250b755",
            "amount": "11000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "35df8fac27554fca191b195febbf4503f5ceab0cba7f271009b034298250b755:0",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 1,
            "txHash": "35df8fac27554fca191b195febbf4503f5ceab0cba7f271009b034298250b755",
            "amount": "86663630",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "35df8fac27554fca191b195febbf4503f5ceab0cba7f271009b034298250b755:1",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 2,
            "txHash": "bd1460fd5ba0e84b86f2c4508ce5932da7064c681eb0e07fd06e01b2eec77e3c",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "bd1460fd5ba0e84b86f2c4508ce5932da7064c681eb0e07fd06e01b2eec77e3c:2",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "6287408"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                0
              ],
              "startLevel": 1
            },
            "txIndex": 3,
            "txHash": "5e55e3374b2d98cedf6d45faa9c61f5bac7ceb8e5da90e46c0ff2fe8dc82db3e",
            "amount": "2000000",
            "receiver": "addr_test1qrgpjmyy8zk9nuza24a0f4e7mgp9gd6h3uayp0rqnjnkl54v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqzp57km",
            "utxoId": "5e55e3374b2d98cedf6d45faa9c61f5bac7ceb8e5da90e46c0ff2fe8dc82db3e:3",
            "assets": [
              {
                "assetId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6.4d494e74",
                "policyId": "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6",
                "name": "4d494e74",
                "amount": "6229118"
              }
            ]
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                63
              ],
              "startLevel": 1
            },
            "txIndex": 0,
            "txHash": "0d2325fe434cfacc8570f607b52cf09accfdae7760c77f7124d3dd33cb39f3f9",
            "amount": "11000000",
            "receiver": "addr_test1qpjflvxuawyl0k0j8hxluk63uex4xgy8au4fwk8ylytftwav4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqpfnnnx",
            "utxoId": "0d2325fe434cfacc8570f607b52cf09accfdae7760c77f7124d3dd33cb39f3f9:0",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                64
              ],
              "startLevel": 1
            },
            "txIndex": 0,
            "txHash": "0ade895c9c3629ab55e312a42cd85a081cd1012a514c7928b2a51a697a0cf2a4",
            "amount": "1000000",
            "receiver": "addr_test1qqwjt3wyk0gn9y9cnwa47zvpadrz3am5hezj5arquedkfxdv4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqytft6k",
            "utxoId": "0ade895c9c3629ab55e312a42cd85a081cd1012a514c7928b2a51a697a0cf2a4:0",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                65
              ],
              "startLevel": 1
            },
            "txIndex": 0,
            "txHash": "0371411f325d45b64b41f744ffa8462eb14d634a5d595cc836c066df82a627e4",
            "amount": "1000000",
            "receiver": "addr_test1qrl4qa94l8e8l7vt97xhzsqhl3vylvf7zyz4g2gmxlq7m7av4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqnp7ehp",
            "utxoId": "0371411f325d45b64b41f744ffa8462eb14d634a5d595cc836c066df82a627e4:0",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                66
              ],
              "startLevel": 1
            },
            "txIndex": 0,
            "txHash": "1db9a594ccad11549eb738f256eb5ccf1d8b7aeb744a77ecce438c8e725bbc7d",
            "amount": "1000000",
            "receiver": "addr_test1qrj93x789krrzs854yywtfrfxx8tfucp9dupn6th3fa0qtdv4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhq8qhs9p",
            "utxoId": "1db9a594ccad11549eb738f256eb5ccf1d8b7aeb744a77ecce438c8e725bbc7d:0",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                67
              ],
              "startLevel": 1
            },
            "txIndex": 0,
            "txHash": "77e90131f07c0b78e352e4c7326cba796698f6ff0720956551044fbabb6baaf5",
            "amount": "1000000",
            "receiver": "addr_test1qrgjclmz59nexx4hl4w3rcn8ezv3ut8n48etr30yydj2zk9v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhqyqh0jq",
            "utxoId": "77e90131f07c0b78e352e4c7326cba796698f6ff0720956551044fbabb6baaf5:0",
            "assets": []
          },
          {
            "addressing": {
              "path": [
                2147485500,
                2147485463,
                2147483648,
                0,
                68
              ],
              "startLevel": 1
            },
            "txIndex": 0,
            "txHash": "fd44257032d9af9b4614c1782466467f15527ec4f54e1d0b203eb56960355dd4",
            "amount": "1000000000",
            "receiver": "addr_test1qqcgvgcq7aktk6dzec70txey8aan2frvw9esukjec6ur6g9v4dlyj0kwfs0x4e38a7047lymzp37tx0y42glslcdtzhq6aq7qs",
            "utxoId": "fd44257032d9af9b4614c1782466467f15527ec4f54e1d0b203eb56960355dd4:0",
            "assets": []
          }
        ]

        const txOptions = {metadata: undefined}

        const config = {
          "linearFee": {
            "coefficient": "44",
            "constant": "155381"
          },
          "minimumUtxoVal": "1000000",
          "poolDeposit": "500000000",
          "keyDeposit": "2000000",
          "networkId": 300
        }

        const unsignedTx = await yoroiLib.createUnsignedWithdrawalTx(
          accountState,
          defaultAsset,
          new BigNumber('63546344'),
          addressedUtxos,
          withdrawalInfo,
          changeAddr,
          config,
          txOptions
        )

        const keyLevel = 3

        const signedTx = await unsignedTx.sign(
          keyLevel,
          accountPrivateKey,
          unsignedTx.neededStakingKeyHashes.wits,
          [{
            rewardAddress: 'e0acab7e493ece4c1e6ae627ef9f5f7c9b1063e599e4aa91f87f0d58ae',
            privateKey: await yoroiLib.Wasm.Bip32PrivateKey.fromBytes(
              Buffer.from(accountPrivateKey, 'hex')
            ).then(x => x.derive(2147485500))
            .then(x => x.derive(2147485463))
            .then(x => x.derive(0))
            .then(x => x.derive(2))
            .then(x => x.derive(0))
            .then(x => x.toRawKey())
          }]
        )

        const tx = await yoroiLib.Wasm.Transaction.fromBytes(
          Buffer.from(signedTx.encodedTx)
        )

        expect(await tx.isValid())
          .to.be.true
        expect(await tx.witnessSet().then(x => x.vkeys()).then(x => x.len()))
          .to.equal(2) // one for the UTxO and one for the staking key
      })
    })

    describe('getBalanceForStakingCredentials', () => {
      it('should group utxos amount by stake credential', async () => {
        const balances = await yoroiLib.getBalanceForStakingCredentials([
          {
            amount: '5000',
            receiver: 'addr1qxsnezdjclcc03e5znpt470n405l9ryczupedg6e7h84gz94nvnvag40lslxr0m9lsp0hjzr75l4gh5j443a46zh76nqvrydcj'
          },
          {
            amount: '15000',
            receiver: 'addr1q8vxu0jgdruwameanq7sfnc7yuxpjgy7scnqfcd2x85al894nvnvag40lslxr0m9lsp0hjzr75l4gh5j443a46zh76nqfh7w8s'
          },
          {
            amount: '3000',
            receiver: 'addr1q87nccqqfxfl6fcde3c47peskx3hjv7arewvjd5ghxkypcdsa6ec7t94f30e4v2e9f8gkgcqvvdhnkq3v0py6nhgmfys7q62ze'
          }
        ])

        expect(balances).to.eql({
          '8200581cb59b26cea2affc3e61bf65fc02fbc843f53f545e92ad63dae857f6a6': '20000',
          '8200581cb0eeb38f2cb54c5f9ab1592a4e8b2300631b79d81163c24d4ee8da49': '3000'
        })
      })
    })

    describe('Ledger', () => {
      it('should build Ledger payload for signing TX', async () => {
        const params = buildDummyTxParameters(false)

        const pk = await yoroiLib.Wasm.Bip32PrivateKey.fromBytes(
          Buffer.from(
            '780de6f67db8e048fe17df60d1fff06dd700cc54b10fc4bcf30f59444d46204c0b890d7dce4c8142d4a4e8e26beac26d6f3c191a80d7b79cc5952968ad7ffbb7d43e76aa8d9b5ad9d91d48479ecd8ef6d00e8df8874e8658ece0cdef94c42367',
            'hex'
          )
        )

        const unsignedVotingTx = await yoroiLib.createUnsignedVotingTx(
          params.absSlotNumber,
          defaultToken,
          await pk.toPublic().then(p => p.toRawKey()),
          [2147485500, 2147485463, 2147483648, 0, 3],
          await pk.toPublic().then(p => p.toRawKey()),
          params.utxos,
          params.changeAddress,
          params.config,
          {},
          5,
          (hashedMeta) => pk.toRawKey().then(k => k.sign(hashedMeta)).then(x => x.toHex())
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
