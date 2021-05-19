import { environments } from '../test-utils'
import request from 'supertest'

const env = new environments.MockEntityMikroTestEnvironment([1, 2, 3])

describe('Club Router', () => {
  let webServer: environments.MikroEnvironmentVariables['webServer']
  beforeAll(async () => {
    const variables = await env.setup()
    webServer = variables.webServer
  })
  afterAll(async () => {
    await env.teardown()
  })

  test('When a GET req is fired to /events, it should return all events', async () => {
    const res = await request(webServer).get('/api/v1/events').set('Accept', 'application/json')
    for (let i = 1; i <= 3; i++) {
      expect(res.body).toContainEqual(expect.objectContaining({ name: `Event Name ${i}` }))
    }
    expect(res.body.length).toBe(3)
    expect(res.status).toBe(200)
  })
})
