import { mocks } from '../../../../../test-utils'
import { PlaceDTO } from '../../../mappers/place-dto'
import { Result } from '../../../../../shared/core/result'
import { GetAllPlacesUseCase } from '../get-all-places-use-case'
import { AppError } from '../../../../../shared/core/app-error'

jest.mock('../../../repos/mock-place-repo')

describe('GetAllPlacesController', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockPlaceDTOs: Array<PlaceDTO> = ids.map(mocks.mockPlaceDTO)
  const { getAllPlacesController } = mocks.mockGetAllPlaces()

  test('When executed, the GetAllPlacesController returns 200 OK', async () => {
    jest.spyOn(GetAllPlacesUseCase.prototype, 'execute').mockResolvedValue(Result.ok(mockPlaceDTOs))

    const { req, res } = mocks.mockHandlerParams()
    await getAllPlacesController.execute(req, res)
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res._getData())
    for (const mockPlaceDTO of mockPlaceDTOs) {
      expect(body).toContainEqual(mockPlaceDTO)
    }
  })

  test('If use case throws error, the GetAllPlacesController responds 500', async () => {
    jest
      .spyOn(GetAllPlacesUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const { req, res } = mocks.mockHandlerParams()
    await getAllPlacesController.execute(req, res)
    expect(res.statusCode).toBe(500)
  })
})
