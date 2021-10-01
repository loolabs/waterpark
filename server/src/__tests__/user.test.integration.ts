import { environments } from '../test-utils'
import request from 'supertest'

// The test environment is known to take a while to set up.
jest.setTimeout(60000)
const env = new environments.MockEntityMikroTestEnvironment([1, 2, 3])

// The tests in this file are known to be flaky.
jest.retryTimes(5)

describe('User Router', () => {
  let webServer: environments.MikroEnvironmentVariables['webServer']
  beforeAll(async () => {
    const variables = await env.setup()
    webServer = variables.webServer
  })
  afterAll(async () => {
    await env.teardown()
  })

  test('When a POST req is fired to /users, it should create a user', async () => {
    const validEmail = `${Date.now()}@uwaterloo.ca`
    const validPassword = 'secret'
    const res = await request(webServer)
      .post('/api/v1/users')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .set('Accept', 'application/json')

    expect(res.status).toBe(200)
  })
})
