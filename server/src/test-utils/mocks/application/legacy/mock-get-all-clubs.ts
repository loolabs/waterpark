import { ClubEntity } from '../../../../shared/infra/db/entities/legacy/club.entity'
import { MockClubRepo } from '../../../../modules/legacy/clubs/infra/repos/implementations/mock-club-repo'
import { GetAllClubsController } from '../../../../modules/legacy/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { GetAllClubsUseCase } from '../../../../modules/legacy/clubs/application/use-cases/get-all-clubs/get-all-clubs-use-case'

export const mockGetAllClubs = (eventEntities: Array<ClubEntity> = []) => {
  const clubRepo = new MockClubRepo(eventEntities)
  const getAllClubsUseCase = new GetAllClubsUseCase(clubRepo)
  const getAllClubsController = new GetAllClubsController(getAllClubsUseCase)

  return { clubRepo, getAllClubsUseCase, getAllClubsController }
}
