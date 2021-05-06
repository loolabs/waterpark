import environment, { Variables } from './utils/mikro-integration-test-environment'
import request from 'supertest'

describe('Event Router', () => {
  let app: Variables['app']
  beforeAll(async () => {
    const variables = await environment.setup()
    app = variables.app
  })
  afterAll(async () => {
    await environment.teardown()
  })

  test('When a GET req is fired to /events, it should return all events', async () => {
    const res = await request(app).get('/api/v1/events').set('Accept', 'application/json')
    for (let i = 1; i <= 3; i++) {
      expect(res.body).toContainEqual(expect.objectContaining({ name: `Event Name ${i}` }))
    }
    expect(res.body.length).toBe(3)
    expect(res.status).toBe(200)
  })
})
