import { mocks } from '../../../../../../test-utils'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { Club } from '../../../../domain/entities/club'
import { ClubDTO } from '../../../../mappers/club-dto'

jest.mock('../../../../infra/repos/implementations/mock-club-repo')

describe('GetAllClubsUseCase', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockClubs: Array<Club> = ids.map(mocks.mockClub)
  const mockClubDTOs: Array<ClubDTO> = ids.map(mocks.mockClubDTO)
  const { clubRepo, getAllClubsUseCase } = mocks.mockGetAllClubs()

  test('When executed, should return all clubs and an Ok', async () => {
    jest.spyOn(clubRepo, 'getAllClubs').mockResolvedValue(Result.ok(mockClubs))

    const getAllClubsResult = await getAllClubsUseCase.execute()

    expect(clubRepo.getAllClubs).toBeCalled()
    expect(getAllClubsResult.isOk()).toBe(true)
    if (getAllClubsResult.isOk()) {
      expect(getAllClubsResult.value.length).toBe(ids.length)
      for (const mockClubDTO of mockClubDTOs) {
        expect(getAllClubsResult.value).toContainEqual(mockClubDTO)
      }
    }
  })

  test('When repo throws error, should return AppError.UnexpectedError', async () => {
    jest
      .spyOn(clubRepo, 'getAllClubs')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const getAllClubsResult = await getAllClubsUseCase.execute()

    expect(clubRepo.getAllClubs).toBeCalled()
    expect(getAllClubsResult.isErr()).toBe(true)
  })
})
