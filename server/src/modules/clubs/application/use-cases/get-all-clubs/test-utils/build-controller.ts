import { MikroClubRepo } from '../../../../infra/repos/implementations/mikro-club-repo'
import { GetAllClubsController } from '../get-all-clubs-controller'
import { GetAllClubsUseCase } from '../get-all-clubs-use-case'

export const buildController = (): GetAllClubsController => {
  const fakeMikroClubRepo = new MikroClubRepo()
  const createClubUseCase = new GetAllClubsUseCase(fakeMikroClubRepo)
  const createClubController = new GetAllClubsController(createClubUseCase)

  return createClubController
}
