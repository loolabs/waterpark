import { mocks } from '../../../../../../test-utils'
import { EventDTO } from '../../../../mappers/event-dto'
import { Result } from '../../../../../../shared/core/result'
import { GetAllEventsUseCase } from '../get-all-events-use-case'
import { AppError } from '../../../../../../shared/core/app-error'

jest.mock('../../../../infra/repos/implementations/mock-event-repo')

describe('GetAllEventsController', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockEventDTOs: Array<EventDTO> = ids.map(mocks.mockEventDTO)
  const { getAllEventsController } = mocks.mockGetAllEvents()

  test('When executed, the GetAllEventsController returns 200 OK', async () => {
    jest.spyOn(GetAllEventsUseCase.prototype, 'execute').mockResolvedValue(Result.ok(mockEventDTOs))

    const { req, res } = mocks.mockHandlerParams()
    await getAllEventsController.execute(req, res)
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res._getData())
    for (const mockEventDTO of mockEventDTOs) {
      expect(body).toContainEqual(mockEventDTO)
    }
  })

  test('If use case throws error, the GetAllEventsController responds 500', async () => {
    jest
      .spyOn(GetAllEventsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const { req, res } = mocks.mockHandlerParams()
    await getAllEventsController.execute(req, res)
    expect(res.statusCode).toBe(500)
  })
})
