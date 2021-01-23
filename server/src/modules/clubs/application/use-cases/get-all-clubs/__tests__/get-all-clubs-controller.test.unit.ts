import httpMocks from 'node-mocks-http'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/routes/decoded-request'
import { ClubDTO } from '../../../../mappers/club-dto'
import { GetAllClubsUseCase } from '../get-all-clubs-use-case'
import { buildController } from '../test-utils/build-controller'
import { createMockClubDTOs } from '../test-utils/create-club-dtos'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../../../../infra/repos/implementations/mikro-club-repo')
jest.mock('../get-all-clubs-use-case')

describe('GetAllClubsController', () => {
  let mockClubDTOs: Array<ClubDTO>

  beforeAll(() => {
    mockClubDTOs = createMockClubDTOs()
  })

  test('When the GetAllClubsUseCase returns Ok, the GetAllClubsController returns 200 OK', async () => {
    const mockRequest = httpMocks.createRequest() as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(GetAllClubsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.ok(mockClubDTOs))
    const getAllClubsController = buildController()

    const result = await getAllClubsController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(200)
  })

  test('When the GetAllClubsUseCase returns AppError.UnexpectedError, GetAllClubsController returns 500 Internal Server Error', async () => {
    const mockRequest = httpMocks.createRequest() as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(GetAllClubsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))
    const createUserController = buildController()

    const result = await createUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(500)
  })
})
