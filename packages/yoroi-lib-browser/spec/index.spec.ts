import { setupTests } from '../../yoroi-lib-core/spec/index.spec'

/*
  this is kinda hacky, but we need to wrap `setupTests` into a `describe(() => it() => {...})`,
  otherwise the test suite won't be detected by Karma
*/
describe('Startup', () => {
  it('should bootstrap', async () => {
    const { init } = await import('../src')

    setupTests(init() as any, 'Yoroi Lib Browser')
  })
})
