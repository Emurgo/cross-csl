import { init } from '../src'

import { setupTests } from '../../yoroi-lib-core/spec/index.spec'

setupTests(init() as any, 'Yoroi Lib Core')
