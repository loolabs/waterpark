import { UseCases } from './use-cases'
import { CreateUserController } from '../../modules/users/application/use-cases/create-user/create-user-controller'
import { GetAllClubsController } from '../../modules/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { GetAllEventsController } from '../../modules/events/application/use-cases/get-all-events/get-all-events-controller'

export interface Controllers {
  createUser: CreateUserController
  getAllClubs: GetAllClubsController
  getAllEvents: GetAllEventsController
}

export const setupControllers = (useCases: UseCases): Controllers => {
  return {
    createUser: new CreateUserController(useCases.createUser),
    getAllClubs: new GetAllClubsController(useCases.getAllClubs),
    getAllEvents: new GetAllEventsController(useCases.getAllEvents),
  }
}
