import { MikroClubRepo } from '../../../../infra/repos/implementations/mikro-club-repo'
import { GetAllClubsController } from '../get-all-clubs-controller'
import { GetAllClubsUseCase } from '../get-all-clubs-use-case'

export const buildController = (): GetAllClubsController => {
  const fakeMikroUserRepo = new MikroClubRepo()
  const getAllClubsUseCase = new GetAllClubsUseCase(fakeMikroUserRepo)
  const getAllClubsController = new GetAllClubsController(getAllClubsUseCase)

  return getAllClubsController
}
