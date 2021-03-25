import express from 'express'
import request from 'supertest'
import { v1Router } from '../shared/infra/http/routes'
import { populate, teardown } from './utils/setup'

const app = express()
app.use(express.json())
app.use('/api/v1', v1Router)

describe('Event Router', () => {
  beforeAll(populate)

  afterAll(teardown)

  test('When a GET req is fired to /events, it should return all events', async () => {
    const res = await request(app).get('/api/v1/events').set('Accept', 'application/json')
    for (let i = 1; i <= 3; i++) {
      expect(res.body).toContainEqual(expect.objectContaining({ name: `Event Name ${i}` }))
    }
    console.log(res.body)
    expect(res.body.length).toBe(3)
    expect(res.status).toBe(200)
  })
})
