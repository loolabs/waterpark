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
import { LoginUserController } from '../login-user-controller'
import { mocks } from '../../../../../../test-utils'
import { CreateUserDTO } from '../../create-user/create-user-dto'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../../../../infra/repos/implementations/mikro-user-repo')
jest.mock('../login-user-use-case')

describe('LoginUserController', () => {
  let loginUserDTO: LoginUserDTO
  let userDTO: CreateUserDTO
  let loginUserController: LoginUserController
  let mockUser: User

  beforeAll(async () => {
    const loginUser = await mocks.mockLoginUser()
    loginUserController = loginUser.loginUserController
  })

  beforeEach(() => {
    loginUserDTO = {
      req: httpMocks.createRequest(),
      res: httpMocks.createResponse()
    }
    userDTO = {
      email: 'loolabs@uwaterloo.ca',
      password: 'password',
    }
  })

  test('When the LoginUserUseCase returns Ok, the LoginUserController returns 200 OK', async () => {
    const useCaseResolvedValue: UserAuthHandlerLoginSuccess = {
      user: UserMap.toDTO(mockUser),
      authCert: "testtoken"
    }
    jest.spyOn(LoginUserUseCase.prototype, 'execute').mockResolvedValue(Result.ok(useCaseResolvedValue))

    const result = await loginUserController.executeImpl(loginUserDTO, loginUserDTO.res)

    expect(result.statusCode).toBe(200)
  })

  test('When the LoginUserUseCase returns UserValueObjectErrors.InvalidEmail, LoginUserController returns 400 Bad Request', async () => {
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new UserValueObjectErrors.InvalidEmail(userDTO.email)))

    const result = await loginUserController.executeImpl(loginUserDTO, loginUserDTO.res)

    expect(result.statusCode).toBe(400)
  })

  test('When the LoginUserUseCase returns UserValueObjectErrors.InvalidPassword, LoginUserController returns 400 Bad Request', async () => {
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new UserValueObjectErrors.InvalidPassword(userDTO.password))
      )

    const result = await loginUserController.executeImpl(loginUserDTO, mockResponse)

    expect(result.statusCode).toBe(400)
  })

  test('When the LoginUserUseCase returns LoginUserErrors.IncorrectPasswordError, LoginUserController returns 400 Unauthorized', async () => {
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new LoginUserErrors.IncorrectPasswordError())
      )

    const result = await loginUserController.executeImpl(loginUserDTO, loginUserDTO.res)

    expect(result.statusCode).toBe(400)
  })

  test('When the LoginUserUseCase returns AppError.UnexpectedError, LoginUserController returns 500 Internal Server Error', async () => {
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))

    const result = await loginUserController.executeImpl(loginUserDTO, loginUserDTO.res)

    expect(result.statusCode).toBe(500)
  })
})
