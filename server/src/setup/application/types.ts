import { CreateUserUseCase } from '../../modules/users/application/use-cases/create-user/create-user-use-case'
import { GetAllClubsUseCase } from '../../modules/legacy/clubs/application/use-cases/get-all-clubs/get-all-clubs-use-case'
import { GetAllEventsUseCase } from '../../modules/legacy/events/application/use-cases/get-all-events/get-all-events-use-case'
import { GetAllPlacesUseCase } from './../../modules/places/use-cases/get-all-places/get-all-places-use-case'
import { GetAllWashroomsUseCase } from '../../modules/washrooms/use-cases/get-all-washrooms/get-all-washrooms-use-case'
import { GetWashroomByIdUseCase } from '../../modules/washrooms/use-cases/get-washroom-by-id/get-washroom-by-id-use-case'
import { CreateUserController } from '../../modules/users/application/use-cases/create-user/create-user-controller'
import { GetAllClubsController } from '../../modules/legacy/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { GetAllEventsController } from '../../modules/legacy/events/application/use-cases/get-all-events/get-all-events-controller'
import { GetAllPlacesController } from './../../modules/places/use-cases/get-all-places/get-all-places-controller'
import { GetAllWashroomsController } from '../../modules/washrooms/use-cases/get-all-washrooms/get-all-washrooms-controller'
import { GetWashroomByIdController } from '../../modules/washrooms/use-cases/get-washroom-by-id/get-washroom-by-id-controller'

export interface UseCases {
  createUser: CreateUserUseCase
  getAllClubs: GetAllClubsUseCase
  getAllEvents: GetAllEventsUseCase
  getAllPlaces: GetAllPlacesUseCase
  getAllWashrooms: GetAllWashroomsUseCase
  getWashroomById: GetWashroomByIdUseCase
}

export interface Controllers {
  createUser: CreateUserController
  getAllClubs: GetAllClubsController
  getAllEvents: GetAllEventsController
  getAllPlaces: GetAllPlacesController
  getAllWashrooms: GetAllWashroomsController
  getWashroomById: GetWashroomByIdController
}

export interface Application {
  useCases: UseCases
  controllers: Controllers
}
