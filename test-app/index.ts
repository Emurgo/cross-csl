import * as mocha from 'mocha'

import { setupTests } from '../packages/yoroi-lib-core/spec/index.spec'
import { init as initBrowser } from '../packages/yoroi-lib-browser/src'

(async function() {
  mocha.setup('bdd')

  const yoroiLibBrowser = initBrowser()

  setupTests(yoroiLibBrowser, 'Yoroi Lib Browser')

  mocha.run()
})()