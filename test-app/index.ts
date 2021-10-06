import * as mocha from 'mocha'

import { setupTests } from '../packages/yoroi-lib-core/spec/index.spec'
import { init } from '../packages/yoroi-lib-browser/src'

(async function() {
  mocha.setup('bdd')

  const yoroiLibBrowser = init()

  setupTests(yoroiLibBrowser as any, 'Yoroi Lib Browser')

  mocha.run()
})()