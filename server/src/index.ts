import express from 'express'
import { RequestContext } from '@mikro-orm/core'
import { MikroORM } from '@mikro-orm/core/MikroORM'
import mikroORMConfig from './mikro-orm.config'
import { UserEntity } from './shared/infra/db/entities/user.entity'
import { ClubEntity } from './shared/infra/db/entities/club.entity'
import { EventEntity } from './shared/infra/db/entities/event.entity'
import { MikroUserRepo } from './modules/users/infra/repos/implementations/mikro-user-repo'
import { MikroEventRepo } from './modules/events/infra/repos/implementations/mikro-event-repo'
import { MikroClubRepo } from './modules/clubs/infra/repos/implementations/mikro-club-repo'
import { GetAllClubsUseCase } from './modules/clubs/application/use-cases/get-all-clubs/get-all-clubs-use-case'
import { GetAllClubsController } from './modules/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { CreateUserUseCase } from './modules/users/application/use-cases/create-user/create-user-use-case'
import { CreateUserController } from './modules/users/application/use-cases/create-user/create-user-controller'
import { ClubRouter } from './modules/clubs/infra/http/routes/club-router'
import { v1APIRouter } from './shared/infra/http/routes/v1-api-router'
import { UserRouter } from './modules/users/infra/http/routes/user-router'
import { EventRouter } from './modules/events/infra/http/routes/event-router'
import { GetAllEventsUseCase } from './modules/events/application/use-cases/get-all-events/get-all-events-use-case'
import { GetAllEventsController } from './modules/events/application/use-cases/get-all-events/get-all-events-controller'

const setup = async () => {
  const app = express()

  const port = process.env.PORT || 3001

  const orm = await MikroORM.init(mikroORMConfig)
  const entityManager = orm.em
  const usersEntityRepo = entityManager.getRepository(UserEntity)
  const clubsEntityRepo = entityManager.getRepository(ClubEntity)
  const eventsEntityRepo = entityManager.getRepository(EventEntity)
  const migrator = orm.getMigrator()
  await migrator.up()

  const mikroUserRepo = new MikroUserRepo(usersEntityRepo)
  const mikroClubRepo = new MikroClubRepo(clubsEntityRepo)
  const mikroEventRepo = new MikroEventRepo(eventsEntityRepo)

  const createUserUseCase = new CreateUserUseCase(mikroUserRepo)
  const createUserController = new CreateUserController(createUserUseCase)

  const getAllClubsUseCase = new GetAllClubsUseCase(mikroClubRepo)
  const getAllClubsController = new GetAllClubsController(getAllClubsUseCase)

  const getAllEventsUseCase = new GetAllEventsUseCase(mikroEventRepo)
  const getAllEventsController = new GetAllEventsController(getAllEventsUseCase)

  const endpointRouters = {
    userRouter: UserRouter.using(createUserController),
    clubRouter: ClubRouter.using(getAllClubsController),
    eventRouter: EventRouter.using(getAllEventsController),
  }
  const v1apiRouter = v1APIRouter.using(endpointRouters)

  app.use(express.json())
  app.use((_req, _res, next) => RequestContext.create(entityManager, next))
  app.use('/api/v1', v1apiRouter)
  app.use((_req, res) => res.status(404).json({ message: 'No route found' }))
  app.listen(port, () => {
    console.log(`Waterpark REST API server running on port ${port} 🦆`)
  })
}

setup()
