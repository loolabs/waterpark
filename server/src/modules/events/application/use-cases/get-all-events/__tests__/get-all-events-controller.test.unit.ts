import httpMocks from 'node-mocks-http'
import { EventDTO } from '../../../../mappers/event-dto'
import { createMockEventDTO } from '../test-utils/create-mock-event-dto'
import { Result } from '../../../../../../shared/core/result'
import { GetAllEventsUseCase } from '../get-all-events-use-case'
import { setup } from '../test-utils/setup'
import { AppError } from '../../../../../../shared/core/app-error'
import { createHttpMock } from '../../../../../../shared/infra/http/test-utils/create-http-mock'

jest.mock('../../../../infra/repos/implementations/mock-event-repo')

describe('GetAllEventsController', () => {
  const ids = [1, 2, 3]
  const mockEventDTOs: Array<EventDTO> = ids.map(createMockEventDTO)

  test('When executed, the GetAllEventsController returns 200 OK', async () => {
    const { req, res } = createHttpMock()
    jest.spyOn(GetAllEventsUseCase.prototype, 'execute').mockResolvedValue(Result.ok(mockEventDTOs))

    const { getAllEventsController } = setup()

    const result: httpMocks.MockResponse<any> = await getAllEventsController.execute(req, res) //TODO: find proper type for result so that ._getData() property is found by compiler

    expect(result.statusCode).toBe(200)

    const body = JSON.parse(result._getData())
    for (const mockEventDTO of mockEventDTOs) {
      expect(body).toContainEqual(mockEventDTO)
    }
  })

  test('If use case throws error, the GetAllEventsController responds 500', async () => {
    const { req, res } = createHttpMock()
    jest
      .spyOn(GetAllEventsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const { getAllEventsController } = setup()

    const result = await getAllEventsController.execute(req, res)

    expect(result.statusCode).toBe(500)
  })
})
