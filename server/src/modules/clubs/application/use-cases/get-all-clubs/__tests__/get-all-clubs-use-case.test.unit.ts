import { Club } from '../../../../domain/entities/club'
import { MikroClubRepo } from '../../../../infra/repos/implementations/mikro-club-repo'
import { GetAllClubsUseCase } from '../get-all-clubs-use-case'
import { createMockClubs } from '../test-utils/create-clubs'
import { createMockClubDTOs } from '../test-utils/create-club-dtos'
import { ClubDTO } from '../../../../mappers/club-map'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'

jest.mock('../../../../infra/repos/implementations/mikro-club-repo')

describe('GetAllClubsUseCase', () => {
  let mockClubs: Result<Array<Club>, AppError.UnexpectedError>
  let mockClubDTOs: Array<ClubDTO>
  beforeAll(() => {
    mockClubs = createMockClubs()
    mockClubDTOs = createMockClubDTOs()
  })

  test('When executed, should return all clubs and an Ok', async () => {
    jest.spyOn(MikroClubRepo.prototype, 'getAllClubs').mockResolvedValue(mockClubs)
    const fakeMikroClubRepo = new MikroClubRepo()
    const getAllClubsUseCase = new GetAllClubsUseCase(fakeMikroClubRepo)

    const getAllClubsResult = await getAllClubsUseCase.execute()

    expect(fakeMikroClubRepo.getAllClubs).toBeCalled()
    expect(getAllClubsResult.isOk()).toBe(true)
    if (getAllClubsResult.isOk()) {
      expect(getAllClubsResult.value.length).toBe(3)
      for (const mockClubDTO of mockClubDTOs) {
        expect(getAllClubsResult.value).toContainEqual(mockClubDTO)
      }
    }
  })

  test('When repo throws error, should return AppError.UnexpectedError', async () => {
    jest
      .spyOn(MikroClubRepo.prototype, 'getAllClubs')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))
    const fakeMikroClubRepo = new MikroClubRepo()
    const getAllClubsUseCase = new GetAllClubsUseCase(fakeMikroClubRepo)

    const getAllClubsResult = await getAllClubsUseCase.execute()
    expect(fakeMikroClubRepo.getAllClubs).toBeCalled()
    expect(getAllClubsResult.isErr()).toBe(true)
  })
})
