import { Club } from '../../../../modules/legacy/clubs/domain/entities/club'
import { MockClubRepo } from '../../../../modules/legacy/clubs/infra/repos/implementations/mock-club-repo'
import { GetAllClubsController } from '../../../../modules/legacy/clubs/application/use-cases/get-all-clubs/get-all-clubs-controller'
import { GetAllClubsUseCase } from '../../../../modules/legacy/clubs/application/use-cases/get-all-clubs/get-all-clubs-use-case'

export function mockGetAllClubs(clubs: Array<Club> = []) {
  const clubRepo = new MockClubRepo(clubs)
  const getAllClubsUseCase = new GetAllClubsUseCase(clubRepo)
  const getAllClubsController = new GetAllClubsController(getAllClubsUseCase)

  return { clubRepo, getAllClubsUseCase, getAllClubsController }
}
