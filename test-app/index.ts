import * as mocha from 'mocha'

import { setupTests } from '../packages/yoroi-lib-core/spec/index.spec'
import { init } from '../packages/yoroi-lib-browser'

(async function() {
  mocha.setup('bdd')

  const yoroiLibBrowser = init()

  setupTests(yoroiLibBrowser, 'Yoroi Lib Browser')

  mocha.run()
})()