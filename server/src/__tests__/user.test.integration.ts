import express from 'express'
import request from 'supertest'
import { MikroORM } from '@mikro-orm/core'
import mikroORMConfig from '../mikro-orm.config'
import { v1Router } from '../shared/infra/http/routes'
import { DB } from '../shared/infra/db'
import { UserEntity } from '../shared/infra/db/entities/user.entity'

const app = express()
app.use(express.json())
app.use('/api/v1', v1Router)

describe('User Router', () => {
  beforeAll(async () => {
    DB.orm = await MikroORM.init({
      ...mikroORMConfig,
      debug: false,
    })
    DB.em = DB.orm.em
    DB.usersEntityRepo = DB.orm.em.getRepository(UserEntity)
  })

  afterAll(() => {
    DB.orm.close()
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
