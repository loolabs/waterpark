import { mikroClubRepo } from '../../../infra/repos'
import { GetAllClubsController } from './get-all-clubs-controller'
import { GetAllClubsUseCase } from './get-all-clubs-use-case'

const getAllClubsUseCase = new GetAllClubsUseCase(mikroClubRepo)
const getAllClubsController = new GetAllClubsController(getAllClubsUseCase)

export { getAllClubsController, getAllClubsUseCase }
