import express from 'express'
import { RequestContext } from '@mikro-orm/core'
import { MikroORM } from '@mikro-orm/core/MikroORM'
import { v1Router } from './shared/infra/http/routes'
import mikroORMConfig from './mikro-orm.config'
import { DB } from './shared/infra/db'
import { UserEntity } from './shared/infra/db/entities/user.entity'
import { ClubEntity } from './shared/infra/db/entities/club.entity'

const app = express()

const port = process.env.PORT || 3001

const initializeORM = async (DBObject: typeof DB) => {
  DBObject.orm = await MikroORM.init(mikroORMConfig)
  DBObject.em = DBObject.orm.em
  DBObject.usersEntityRepo = DBObject.orm.em.getRepository(UserEntity)
  DBObject.clubsEntityRepo = DBObject.orm.em.getRepository(ClubEntity)

  const migrator = DBObject.orm.getMigrator()
  await migrator.up()
}

const bootstrap = async () => {
  await initializeORM(DB)
  app.use(express.json())

  app.use((_req, _res, next) => RequestContext.create(DB.orm.em, next))
  app.use('/api/v1', v1Router)

  app.use((_req, res) => res.status(404).json({ message: 'No route found' }))
  app.listen(port, () => {
    console.log(`Waterpark REST API server running on port ${port} 🦆`)
  })
}

bootstrap()
