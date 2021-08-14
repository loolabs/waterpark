import { UseCases, Controllers } from './types'
import { CreateUserController } from '../../modules/users/application/use-cases/create-user/create-user-controller'
import { GetAllClubsController } from '../../modules/legacy/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { GetAllEventsController } from '../../modules/legacy/events/application/use-cases/get-all-events/get-all-events-controller'
import { GetAllPlacesController } from '../../modules/places/use-cases/get-all-places/get-all-places-controller'
import { GetAllWashroomsController } from '../../modules/washrooms/use-cases/get-all-washrooms/get-all-washrooms-controller'
import { GetWashroomByIdController } from '../../modules/washrooms/use-cases/get-washroom-by-id/get-washroom-by-id-controller'

export const setupControllers = (useCases: UseCases): Controllers => {
  return {
    createUser: new CreateUserController(useCases.createUser),
    getAllClubs: new GetAllClubsController(useCases.getAllClubs),
    getAllEvents: new GetAllEventsController(useCases.getAllEvents),
    getAllPlaces: new GetAllPlacesController(useCases.getAllPlaces),
    getAllWashrooms: new GetAllWashroomsController(useCases.getAllWashrooms),
    getWashroomById: new GetWashroomByIdController(useCases.getWashroomById),
  }
}
