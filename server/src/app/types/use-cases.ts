import { CreateUserUseCase } from '../../modules/users/application/use-cases/create-user/create-user-use-case'
import { GetAllClubsUseCase } from '../../modules/clubs/application/use-cases/get-all-clubs/get-all-clubs-use-case'
import { GetAllEventsUseCase } from '../../modules/events/application/use-cases/get-all-events/get-all-events-use-case'

export interface UseCases {
  createUser: CreateUserUseCase
  getAllClubs: GetAllClubsUseCase
  getAllEvents: GetAllEventsUseCase
}
