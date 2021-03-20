import httpMocks from 'node-mocks-http'
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/routes/decoded-request'
import { EventDTO } from '../../../../mappers/event-map'
import { createMockEventDTOs } from '../test-utils/create-event-dtos'
import { Result } from '../../../../../../shared/core/result'
import { GetAllEventsUseCase } from '../get-all-events-use-case'
import { buildController } from '../test-utils/build-controller'
import { AppError } from '../../../../../../shared/core/app-error'

jest.mock('../../../../infra/repos/implementations/mikro-event-repo')

describe('GetAllEventsController', () => {
  let mockEventDTOs: Array<EventDTO>
  beforeAll(() => {
    mockEventDTOs = createMockEventDTOs()
  })

  test('When executed, the GetAllEventsController returns 200 OK', async () => {
    const mockRequest = httpMocks.createRequest() as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest.spyOn(GetAllEventsUseCase.prototype, 'execute').mockResolvedValue(Result.ok(mockEventDTOs))

    const getAllEventsController = buildController()

    const result: httpMocks.MockResponse<any> = await getAllEventsController.execute(
      mockRequest,
      mockResponse
    ) //TODO: find proper type for result so that ._getData() property is found by compiler

    expect(result.statusCode).toBe(200)

    const body = JSON.parse(result._getData())
    for (const mockEventDTO of mockEventDTOs) {
      expect(body).toContainEqual(mockEventDTO)
    }
  })

  test('If use case throws error, the GetAllEventsController responds 500', async () => {
    const mockRequest = httpMocks.createRequest() as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(GetAllEventsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const getAllEventsController = buildController()

    const result = await getAllEventsController.execute(mockRequest, mockResponse)

    expect(result.statusCode).toBe(500)
  })
})
