import { UseCases, Controllers } from './types'
import { CreateUserController } from '../../modules/users/application/use-cases/create-user/create-user-controller'
import { GetAllClubsController } from '../../modules/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { GetAllEventsController } from '../../modules/events/application/use-cases/get-all-events/get-all-events-controller'
import { LoginUserController } from '../../modules/users/application/use-cases/login-user/login-user-controller'

export const setupControllers = (useCases: UseCases): Controllers => {
  return {
    createUser: new CreateUserController(useCases.createUser),
    loginUser: new LoginUserController(useCases.loginUser),
    getAllClubs: new GetAllClubsController(useCases.getAllClubs),
    getAllEvents: new GetAllEventsController(useCases.getAllEvents),
  }
}
