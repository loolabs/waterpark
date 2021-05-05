import { ClubEntity } from '../../../../../../shared/infra/db/entities/club.entity'
import { MockClubRepo } from '../../../../infra/repos/implementations/mock-club-repo'
import { GetAllClubsController } from '../get-all-clubs-controller'
import { GetAllClubsUseCase } from '../get-all-clubs-use-case'

const setup = (eventEntities: Array<ClubEntity> = []) => {
  const clubRepo = new MockClubRepo(eventEntities)
  const getAllClubsUseCase = new GetAllClubsUseCase(clubRepo)
  const getAllClubsController = new GetAllClubsController(getAllClubsUseCase)

  return { clubRepo, getAllClubsUseCase, getAllClubsController }
}

export { setup }
