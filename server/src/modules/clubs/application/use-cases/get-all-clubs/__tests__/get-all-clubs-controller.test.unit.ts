import { mocks } from '../../../../../../test-utils'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { ClubDTO } from '../../../../mappers/club-dto'

jest.mock('../../../../infra/repos/implementations/mock-club-repo')

describe('GetAllClubsController', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockClubDTOs: Array<ClubDTO> = ids.map(mocks.mockClubDTO)
  const { getAllClubsUseCase, getAllClubsController } = mocks.mockGetAllClubs()

  test('When executed, the GetAllClubsController returns 200 OK', async () => {
    jest.spyOn(getAllClubsUseCase, 'execute').mockResolvedValue(Result.ok(mockClubDTOs))

    const { req, res } = mocks.mockHandlerParams()
    await getAllClubsController.execute(req, res)
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res._getData())
    for (const mockClubDTO of mockClubDTOs) {
      expect(body).toContainEqual(mockClubDTO)
    }
  })

  test('If use case throws error, the GetAllClubsController responds 500', async () => {
    jest
      .spyOn(getAllClubsUseCase, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const { req, res } = mocks.mockHandlerParams()
    await getAllClubsController.execute(req, res)
    expect(res.statusCode).toBe(500)
  })
})
