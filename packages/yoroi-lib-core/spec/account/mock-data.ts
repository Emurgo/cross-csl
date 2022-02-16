import {
  AccountChainProtocols,
  AddressPath,
  AddressRecord
} from '../../src/account/models'
import { random224Hash, randomFakeAddress } from '../helpers/builders'

export const mockedStorageData = [
  {
    address:
      'addr_2709653f83593f4eb74e7be5081ea96566e89d1f19385997f355f640005914f4',
    hash: '81e8a324ce57b6d3e941dedc4338b1717a603858d8460e93fd0de012',
    account: 0,
    chain: 0,
    addressIndex: 0,
    firstBlock: 0
  },
  {
    address:
      'addr_29f68631f0c93c4aeea4c5d5c290c7db871117c940449bad9d8794bad03e67e6',
    hash: '8563045099e6630e9db244a33670b3e2b60fce4926f841fcbb340b55',
    account: 0,
    chain: 0,
    addressIndex: 1,
    firstBlock: 0
  },
  {
    address:
      'addr_f55004ee1e3598fea48cfa0d92e36c807449d8ecdb464ef76d474aa304d0fadd',
    hash: '8831e839e51c25ad5782505899cd1a858cb440c3bce90caf5dd03a89',
    account: 0,
    chain: 0,
    addressIndex: 2,
    firstBlock: 0
  },
  {
    address:
      'addr_eb0d33ae15d9980cbdb9c5ed0ea15fab524548c7360ec61335bbf4aa5e66b28a',
    hash: '1028cfb1cd5faf56b65490ad8941b3d79f165c1b8b3e2e7caba13a0d',
    account: 0,
    chain: 0,
    addressIndex: 3,
    firstBlock: 0
  },
  {
    address:
      'addr_39793b598d22d2a6d846ac7c12e35530f59590b297e6e84cdc2c511fd17fccd8',
    hash: '96661e04f51a8804f92ad78178754332dd9728683dec751a42e9ad89',
    account: 0,
    chain: 0,
    addressIndex: 4,
    firstBlock: 0
  },
  {
    address:
      'addr_7ddeab1eaab2d440cb692e4e5cf37a097e6906b89d4f31c3f43b7483b0400f7f',
    hash: '12fe2db9cbfd3632ee22e7ff364d071d5fd59b6e7e32d33a4e6c3a32',
    account: 0,
    chain: 1,
    addressIndex: 0,
    firstBlock: 0
  },
  {
    address:
      'addr_db35c80486bcd9a051158f5a4814448d72d8479b73447f178e1755dacf561b99',
    hash: 'dcc3e5b4a489868298db01048bc68d05f3cb33ab7697e29fde107193',
    account: 0,
    chain: 1,
    addressIndex: 1,
    firstBlock: 0
  },
  {
    address:
      'addr_d5ea4fb8aa82ebfcfa2aab0eae18d5fe2298a094dfd1479e87d612e2b0486ce4',
    hash: '9c23c45c53656146627f95cb471091373dd867ae1769306d2209bfdc',
    account: 0,
    chain: 1,
    addressIndex: 2,
    firstBlock: 0
  },
  {
    address:
      'addr_52b753524bc27ea45043f243bea2fde3b60a9e8a32f1ecbbb92b481929496efe',
    hash: '7f4c55d496f6b69fd38c58fd6058d933b42c0086cb734f9753f5677b',
    account: 0,
    chain: 1,
    addressIndex: 3,
    firstBlock: 0
  },
  {
    address:
      'addr_0428cd03a684c833a49b550717a5cb74a04d197f2b9cebffab823d31fca92f4a',
    hash: '094d035e4009ec852685fa16b7deadd41cd041d7734a517c89b136df',
    account: 0,
    chain: 1,
    addressIndex: 4,
    firstBlock: 0
  },
  {
    address:
      'stake421f004176bf5983f4c5b883e91398ff6154e67159d60f13d9836ac7c5b6602a',
    hash: '4c97039daa5c2a78c8508020747d69b5ab0f74b4d2a957e79b55ea59',
    account: 0,
    chain: 2,
    addressIndex: 0,
    firstBlock: 0
  },
  {
    address:
      'stake8f801f7ce84a83f2486f4f23675aa3effacd939f742a3a0d1b19b03173cbed87',
    hash: 'd46acd1c44c99b5bb743b3a0c6193f7c797bfd221b25ebfdf444ddcb',
    account: 0,
    chain: 2,
    addressIndex: 1,
    firstBlock: 0
  }
]

const mockedDerive =
  (prefix?: string) =>
  async ({ account, chain, addressIndex }: AddressPath) => {
    const address = await randomFakeAddress(prefix)
    const hash = await random224Hash(address)
    const addressRecord: AddressRecord = {
      address,
      hash,
      account,
      chain,
      addressIndex,
      firstBlock: 0
    }
    return Promise.resolve(addressRecord)
  }

export const mockedChainProtocols: AccountChainProtocols = new Map([
  [
    0,
    {
      bufferSize: 5,
      gapLimit: 2,
      queryUsedBy: 'address',
      derive: mockedDerive()
    }
  ],
  [
    1,
    {
      bufferSize: 5,
      gapLimit: 2,
      queryUsedBy: 'address',
      derive: mockedDerive()
    }
  ],
  [
    2,
    {
      bufferSize: 2,
      gapLimit: 1,
      queryUsedBy: 'hash',
      derive: mockedDerive('stake')
    }
  ]
])
