import httpMocks from 'node-mocks-http'
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/routes/decoded-request'
import { ClubDTO } from '../../../../mappers/club-dto'
import { createMockClubDTOs } from '../test-utils/create-club-dtos'
import { Result } from '../../../../../../shared/core/result'
import { GetAllClubsUseCase } from '../get-all-clubs-use-case'
import { buildController } from '../test-utils/build-controller'
import { AppError } from '../../../../../../shared/core/app-error'

jest.mock('../../../../infra/repos/implementations/mikro-club-repo')

describe('GetAllClubsController', () => {
  let mockClubDTOs: Array<ClubDTO>
  beforeAll(() => {
    mockClubDTOs = createMockClubDTOs()
  })

  test('When executed, the GetAllClubsController returns 200 OK', async () => {
    const mockRequest = httpMocks.createRequest() as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest.spyOn(GetAllClubsUseCase.prototype, 'execute').mockResolvedValue(Result.ok(mockClubDTOs))

    const getAllClubsController = buildController()

    const result: httpMocks.MockResponse<any> = await getAllClubsController.execute(
      mockRequest,
      mockResponse
    ) //TODO: find proper type for result so that ._getData() property is found by compiler

    expect(result.statusCode).toBe(200)

    const body = JSON.parse(result._getData())
    for (const mockClubDTO of mockClubDTOs) {
      expect(body).toContainEqual(mockClubDTO)
    }
  })

  test('If use case throws error, the GetAllClubsController responds 500', async () => {
    const mockRequest = httpMocks.createRequest() as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(GetAllClubsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const getAllClubsController = buildController()

    const result = await getAllClubsController.execute(mockRequest, mockResponse)

    expect(result.statusCode).toBe(500)
  })
})
