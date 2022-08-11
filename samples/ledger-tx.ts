import { Ada as CardanoLedger } from '@cardano-foundation/ledgerjs-hw-app-cardano'
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid"
import { init } from '@emurgo/yoroi-lib-nodejs'
import BigNumber from 'bignumber.js'

const cardano = init()

export const {
  NetworkInfo,
  PublicKey,
} = cardano.Wasm

const harden = (n: number) => 0x80000000 + n;

(async () => {

  const votingPublicKeyHex = 'aa2cf9aa55b9d98d83ede855e0c585ba0d45798ae653f32a647ff55e56727161'
  const stakingPublicKeyHex = 'aa57edb7f91028eb3853fe5f991d16d0989bf7bc51b3a03f5ef7bafa75f74885'

  const slot = 65829549 + 7200
  const unsignedTx = await cardano.createUnsignedVotingTx(
    // `as any` because package clashing on local env
    // you can probably safely remove it
    new BigNumber(slot) as any,
    {
      identifier: '',
      isDefault: true,
      networkId: 300
    },
    await PublicKey.fromBytes(Buffer.from(votingPublicKeyHex, 'hex')),
    [ harden(1852), harden(1815), harden(0), 2, 0 ],
    await PublicKey.fromBytes(Buffer.from(stakingPublicKeyHex, 'hex')),
    [
      {
        utxoId: '2c16c50fc49745517b7c5ca0039233bcc89e8ee5e7745878ade0fc636a2051fe:0',
        txHash: '2c16c50fc49745517b7c5ca0039233bcc89e8ee5e7745878ade0fc636a2051fe',
        txIndex: 0,
        receiver: 'addr_test1qpss7z3phed5x5y4fnyv7ahltlzqw3dx47h0sufe85ljk3gaa6w4wfl6mf7qjgsp5nqw5wj5uplrzxgmzhuq79rxus2sw6me48',
        amount: '38824863',
        assets: [],
        addressing: {
          startLevel: 1,
          path: [ harden(1852), harden(1815), harden(0), 1, 2 ]
        }
      }
    ],
    {
      address: 'addr_test1qpgeehl4ckmaxas9ve2mwm5hvke679vxceqlxt25q0vr9qqaa6w4wfl6mf7qjgsp5nqw5wj5uplrzxgmzhuq79rxus2stehy0e',
      addressing: {
        startLevel: 1,
          path: [ harden(1852), harden(1815), harden(0), 1, 4 ]
      }
    },
    {
      keyDeposit: '2000000',
      linearFee: {
        constant: '155381',
        coefficient: '44'
      },
      minimumUtxoVal: '1000000',
      poolDeposit: '500000000',
      networkId: 300
    },
    {

    },
    slot,
    await NetworkInfo.testnet().then(n => n.networkId()),
    () => Promise.resolve('0'.repeat(64 * 2))
  )

  const ledgerPayload = await cardano.buildLedgerPayload(
    unsignedTx,
    await NetworkInfo.testnet().then(n => n.networkId()),
    await NetworkInfo.testnet().then(n => n.protocolMagic()),
    [ harden(1852), harden(1815), harden(0), 2, 0 ]
  )

  const transport = await TransportNodeHid.open(undefined)
  const ledger = new CardanoLedger(transport)

  const ledgerSigned = await ledger.signTransaction(ledgerPayload)

  const signedTx = await cardano.buildLedgerSignedTx(
    unsignedTx,
    ledgerSigned,
    harden(1852),
    '39695bc80c0a586f7cb6fdab819fb5016499ff17d58d9da0d5daf414c8a7329a49aa67f8bfebf3300ee9830c40a2fca78bd5f208d80edfc7498a7f0f6e8ef4d2' 
  )

  console.log(Buffer.from(signedTx.encodedTx).toString('base64'))
})()