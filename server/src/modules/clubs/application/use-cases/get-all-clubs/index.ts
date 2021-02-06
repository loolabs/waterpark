import { mikroClubRepo } from '../../../infra/repos'
import { GetAllClubsController } from './get-all-clubs-controller'
// import { GetAllClubsUseCase } from './get-all-clubs-use-case'

// const getAllClubsController
export default new GetAllClubsController(mikroClubRepo)

// export { getAllClubsUseCase, getAllClubsController }
