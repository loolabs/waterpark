import { Club } from '../../../../domain/entities/club'
import { MockClubRepo } from '../../../../infra/repos/implementations/mock-club-repo'
import { createMockClubs } from '../test-utils/create-clubs'
import { createMockClubDTOs } from '../test-utils/create-club-dtos'
import { ClubDTO } from '../../../../mappers/club-dto'
import { setup } from '../test-utils/setup'
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
    jest.spyOn(MockClubRepo.prototype, 'getAllClubs').mockResolvedValue(mockClubs)
    const { clubRepo, getAllClubsUseCase } = setup()

    const getAllClubsResult = await getAllClubsUseCase.execute()

    expect(clubRepo.getAllClubs).toBeCalled()
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
      .spyOn(MockClubRepo.prototype, 'getAllClubs')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))
    const { clubRepo, getAllClubsUseCase } = setup()

    const getAllClubsResult = await getAllClubsUseCase.execute()
    expect(clubRepo.getAllClubs).toBeCalled()
    expect(getAllClubsResult.isErr()).toBe(true)
  })
})
