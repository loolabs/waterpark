import { CreateUserController } from '../../modules/users/application/use-cases/create-user/create-user-controller'
import { GetAllClubsController } from '../../modules/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { GetAllEventsController } from '../../modules/events/application/use-cases/get-all-events/get-all-events-controller'

export interface Controllers {
  createUser: CreateUserController
  getAllClubs: GetAllClubsController
  getAllEvents: GetAllEventsController
}
