import { CreateUserUseCase } from '../../modules/users/application/use-cases/create-user/create-user-use-case'
import { GetAllClubsUseCase } from '../../modules/clubs/application/use-cases/get-all-clubs/get-all-clubs-use-case'
import { GetAllEventsUseCase } from '../../modules/events/application/use-cases/get-all-events/get-all-events-use-case'
import { CreateUserController } from '../../modules/users/application/use-cases/create-user/create-user-controller'
import { GetAllClubsController } from '../../modules/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { GetAllEventsController } from '../../modules/events/application/use-cases/get-all-events/get-all-events-controller'
import { LoginUserUseCase } from '../../modules/users/application/use-cases/login-user/login-user-use-case'
import { GetUserUseCase } from '../../modules/users/application/use-cases/get-user/get-user-use-case'
import { AuthenticateUserUseCase } from '../../modules/users/application/use-cases/authenticate-user/authenticate-user-use-case'
import { LoginUserController } from '../../modules/users/application/use-cases/login-user/login-user-controller'
import { ProtectedUserUseCase } from '../../modules/users/application/use-cases/protected-user/protected-user-use-case'

export interface UseCases {
  createUser: CreateUserUseCase
  loginUser: LoginUserUseCase
  getUser: GetUserUseCase
  authUser: AuthenticateUserUseCase
  getAllClubs: GetAllClubsUseCase
  getAllEvents: GetAllEventsUseCase
  protectedUser: ProtectedUserUseCase
}

export interface Controllers {
  createUser: CreateUserController
  loginUser: LoginUserController
  getAllClubs: GetAllClubsController
  getAllEvents: GetAllEventsController
}

export interface Application {
  useCases: UseCases
  controllers: Controllers
}
