import httpMocks from 'node-mocks-http'
import { Result } from '../../../../../../shared/core/result'
import { ProtectedUserDTO } from '../protected-user-dto'
import { buildController } from '../test-utils/build-controller'
import { ProtectedUserSuccess, ProtectedUserUseCase } from '../protected-user-use-case'
import { AppError } from '../../../../../../shared/core/app-error'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../../../../infra/repos/implementations/mikro-user-repo')
jest.mock('../protected-user-use-case')

describe('LoginUserController', () => {
  let protectedUserDTO: ProtectedUserDTO

  beforeAll(() => {
    protectedUserDTO = {
      val: "message"
    }
  })

  test('When the ProtectedUserUserCase returns Ok, the ProtectedUserController returns 200 OK', async () => {
    const mockResponse = httpMocks.createResponse()
    const useCaseResolvedValue: ProtectedUserSuccess = {
      val: "input"
    }
    jest.spyOn(ProtectedUserUseCase.prototype, 'execute').mockResolvedValue(Result.ok(useCaseResolvedValue))
    const protectedUserController = buildController()

    const result = await protectedUserController.executeImpl(protectedUserDTO, mockResponse)

    expect(result.statusCode).toBe(200)
  }),

  test('When the ProtectedUserUseCase returns AppError.UnexpectedError, ProtectedUserController returns 500 Internal Server Error', async () => {
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(ProtectedUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(protectedUserDTO, mockResponse)

    expect(result.statusCode).toBe(500)
  })
})