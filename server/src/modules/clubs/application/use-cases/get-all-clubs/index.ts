import { mikroClubRepo } from '../../../infra/repos'
import { GetAllClubsController } from './get-all-clubs-controller'

export default new GetAllClubsController(mikroClubRepo)
