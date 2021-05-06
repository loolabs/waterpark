import environment, { Variables } from './utils/mikro-integration-test-environment'
import request from 'supertest'

// must set environment variable DATABASE_URL to postgresql://loolabs:loolabs@localhost/clubs
// to access postgres container on Docker
// TODO: fix integration testing

describe('User Router', () => {
  let app: Variables['app']
  beforeAll(async () => {
    const variables = await environment.setup()
    app = variables.app
  })
  afterAll(async () => {
    await environment.teardown()
  })

  test('When a POST req is fired to /users, it should create a user', async () => {
    const validEmail = `${Date.now()}@uwaterloo.ca`
    const validPassword = 'secret'
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .set('Accept', 'application/json')

    expect(res.status).toBe(200)
  })
})
