import express from 'express'
import request from 'supertest'
import { v1Router } from '../shared/infra/http/routes'
import { populate, teardown } from './utils/setup'

const app = express()
app.use(express.json())
app.use('/api/v1', v1Router)

describe('Club Router', () => {
  beforeAll(async () => {
    await populate()
  })

  afterAll(async () => {
    await teardown()
  })

  test('When a GET req is fired to /clubs, it should return all clubs', async () => {
    const res = await request(app).get('/api/v1/clubs').set('Accept', 'application/json')
    for (let i = 1; i <= 3; i++) {
      expect(res.body).toContainEqual(expect.objectContaining({ name: `Club Name ${i}` }))
    }
    console.log(res.body)
    expect(res.body.length).toBe(3)
    expect(res.status).toBe(200)
  })
})
