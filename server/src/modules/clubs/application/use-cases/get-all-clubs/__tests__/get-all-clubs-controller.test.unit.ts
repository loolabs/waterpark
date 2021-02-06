import httpMocks from 'node-mocks-http'
import { MikroClubRepo } from '../../../../infra/repos/implementations/mikro-club-repo'
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/routes/decoded-request'
import { Club } from '../../../../domain/entities/club'
import { ClubDTO } from '../../../../mappers/club-dto'
import { GetAllClubsController } from '../get-all-clubs-controller'
import { createMockClubs } from '../test-utils/create-clubs'
import { createMockClubDTOs } from '../test-utils/create-club-dtos'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../../../../infra/repos/implementations/mikro-club-repo')
jest.mock('../get-all-clubs-use-case')

describe('GetAllClubsController', () => {
  let mockClubs: Array<Club>
  let mockClubDTOs: Array<ClubDTO>

  beforeAll(() => {
    mockClubs = createMockClubs()
    mockClubDTOs = createMockClubDTOs()
  })

  test('When executed, the GetAllClubsController returns all clubs and 200 OK', async () => {
    const mockRequest = httpMocks.createRequest() as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest.spyOn(MikroClubRepo.prototype, 'getAllClubs').mockResolvedValue(mockClubs)
    const fakeMikroClubRepo = new MikroClubRepo()

    const getAllClubsController = new GetAllClubsController(fakeMikroClubRepo)

    const result: httpMocks.MockResponse<any> = await getAllClubsController.execute(
      mockRequest,
      mockResponse
    ) //TODO: find proper type for result so that ._getData() property is found by compiler

    expect(fakeMikroClubRepo.getAllClubs).toBeCalled()
    expect(result.statusCode).toBe(200)

    const body = JSON.parse(result._getData())
    for (const mockClubDTO of mockClubDTOs) {
      expect(body).toContainEqual(mockClubDTO)
    }
  })
})
