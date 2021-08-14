import { UseCases } from './types'
import { Repos } from '../database'
import { CreateUserUseCase } from '../../modules/users/application/use-cases/create-user/create-user-use-case'
import { GetAllClubsUseCase } from '../../modules/legacy/clubs/application/use-cases/get-all-clubs/get-all-clubs-use-case'
import { GetAllEventsUseCase } from '../../modules/legacy/events/application/use-cases/get-all-events/get-all-events-use-case'
import { GetAllPlacesUseCase } from '../../modules/places/use-cases/get-all-places/get-all-places-use-case'

export const setupUseCases = (repos: Repos): UseCases => {
  return {
    createUser: new CreateUserUseCase(repos.user),
    getAllClubs: new GetAllClubsUseCase(repos.club),
    getAllEvents: new GetAllEventsUseCase(repos.event),
    getAllPlaces: new GetAllPlacesUseCase(repos.place),
  }
}
