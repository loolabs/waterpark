import { mocks } from '../../../../../test-utils'
import { WashroomDTO } from '../../../mappers/washroom-dto'
import { Result } from '../../../../../shared/core/result'
import { GetAllWashroomsUseCase } from '..'
import { AppError } from '../../../../../shared/core/app-error'

jest.mock('../../../repos')

describe('GetAllWashoomsController', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockWashroomDTOs: Array<WashroomDTO> = ids.map(mocks.mockWashroomDTO)
  const { getAllWashroomsController } = mocks.mockGetAllWashrooms()

  test('If use case executes successfully, should respond 200 OK', async () => {
    jest
      .spyOn(GetAllWashroomsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.ok(mockWashroomDTOs))

    const { req, res } = mocks.mockHandlerParams()
    await getAllWashroomsController.execute(req, res)
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res._getData())
    for (const mockWashroomDTO of mockWashroomDTOs) {
      expect(body).toContainEqual(mockWashroomDTO)
    }
  })

  test('If use case throws error, should respond 500', async () => {
    jest
      .spyOn(GetAllWashroomsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const { req, res } = mocks.mockHandlerParams()
    await getAllWashroomsController.execute(req, res)
    expect(res.statusCode).toBe(500)
  })
})
