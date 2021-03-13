import httpMocks from 'node-mocks-http'
import { UserAuthHandlerLoginSuccess } from '../../../../../../shared/auth/user-auth-handler'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { User } from '../../../../domain/entities/user'
import { UserValueObjectErrors } from '../../../../domain/value-objects/errors'
import { UserMap } from '../../../../mappers/user-map'
import { LoginUserDTO } from '../login-user-dto'
import { LoginUserErrors } from '../login-user-errors'
import { LoginUserUseCase } from '../login-user-use-case'
import { buildController } from '../test-utils/build-controller'
import { createMockUser } from '../../create-user/test-utils/create-user'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../../../../infra/repos/implementations/mikro-user-repo')
jest.mock('../login-user-use-case')

describe('LoginUserController', () => {
  let loginUserDTO: LoginUserDTO
  let mockUser: User
  let mockEmail: string
  let mockPassword: string

  beforeAll(() => {
    loginUserDTO = {
      req: httpMocks.createRequest(),
      res: httpMocks.createResponse()
    },
    mockEmail = "loolabs@uwaterloo.ca",
    mockPassword = "password",
    mockUser = createMockUser()
  })

  test('When the LoginUserUseCase returns Ok, the LoginUserController returns 200 OK', async () => {
    const mockResponse = httpMocks.createResponse()
    const useCaseResolvedValue: UserAuthHandlerLoginSuccess = {
      user: UserMap.toDTO(mockUser),
      token: "testtoken"
    }
    jest.spyOn(LoginUserUseCase.prototype, 'execute').mockResolvedValue(Result.ok(useCaseResolvedValue))
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(loginUserDTO, mockResponse)

    expect(result.statusCode).toBe(200)
  })

  test('When the LoginUserUseCase returns UserValueObjectErrors.InvalidEmail, LoginUserController returns 400 Bad Request', async () => {
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new UserValueObjectErrors.InvalidEmail(mockEmail)))
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(loginUserDTO, mockResponse)

    expect(result.statusCode).toBe(400)
  })

  test('When the LoginUserUseCase returns UserValueObjectErrors.InvalidPassword, LoginUserController returns 400 Bad Request', async () => {
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new UserValueObjectErrors.InvalidPassword(mockPassword))
      )
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(loginUserDTO, mockResponse)

    expect(result.statusCode).toBe(400)
  })

  test('When the LoginUserUseCase returns LoginUserErrors.IncorrectPasswordError, LoginUserController returns 409 Conflict', async () => {
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new LoginUserErrors.IncorrectPasswordError())
      )
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(loginUserDTO, mockResponse)

    expect(result.statusCode).toBe(409)
  })

  test('When the LoginUserUseCase returns AppError.UnexpectedError, LoginUserController returns 500 Internal Server Error', async () => {
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(loginUserDTO, mockResponse)

    expect(result.statusCode).toBe(500)
  })
})
