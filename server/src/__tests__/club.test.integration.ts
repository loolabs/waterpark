import environment, { Variables } from './utils/mikro-integration-test-environment'
import request from 'supertest'

describe('Club Router', () => {
  let webServer: Variables['webServer']
  beforeAll(async () => {
    const variables = await environment.setup()
    webServer = variables.webServer
  })
  afterAll(async () => {
    await environment.teardown()
  })

  test('When a GET req is fired to /clubs, it should return all clubs', async () => {
    const res = await request(webServer).get('/api/v1/clubs').set('Accept', 'application/json')
    for (let i = 1; i <= 3; i++) {
      expect(res.body).toContainEqual(expect.objectContaining({ name: `Club Name ${i}` }))
    }
    expect(res.body.length).toBe(3)
    expect(res.status).toBe(200)
  })
})
