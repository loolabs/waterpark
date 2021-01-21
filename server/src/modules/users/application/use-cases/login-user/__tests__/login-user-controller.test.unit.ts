import httpMocks from 'node-mocks-http'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/routes/decoded-request'
import { User } from '../../../../domain/entities/user'
import { UserValueObjectErrors } from '../../../../domain/value-objects/errors'
import { LoginUserDTO } from '../login-user-dto'
import { LoginUserErrors } from '../login-user-errors'
import { LoginUserUseCase } from '../login-user-use-case'
import { buildController } from '../test-utils/build-controller'
import { createMockUser } from '../test-utils/create-user'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../../../../infra/repos/implementations/mikro-user-repo')
jest.mock('../login-user-use-case')

describe('LoginUserController', () => {
  let loginUserDTO: LoginUserDTO
  let mockUser: User

  beforeAll(() => {
    loginUserDTO = {
      email: 'john.doe@uwaterloo.ca',
      password: 'secret',
    }

    mockUser = createMockUser()
  })

  test('When the LoginUserUseCase returns Ok, the LoginUserController returns 200 OK', async () => {
    const mockRequest = httpMocks.createRequest({
      body: loginUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest.spyOn(LoginUserUseCase.prototype, 'execute').mockResolvedValue(Result.ok(mockUser))
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(200)
  })

  test('When the LoginUserUseCase returns UserValueObjectErrors.InvalidEmail, LoginUserController returns 400 Bad Request', async () => {
    const mockRequest = httpMocks.createRequest({
      body: loginUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new UserValueObjectErrors.InvalidEmail(loginUserDTO.email)))
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(400)
  })

  test('When the LoginUserUseCase returns UserValueObjectErrors.InvalidPassword, LoginUserController returns 400 Bad Request', async () => {
    const mockRequest = httpMocks.createRequest({
      body: loginUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new UserValueObjectErrors.InvalidPassword(loginUserDTO.password))
      )
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(400)
  })

  test('When the LoginUserUseCase returns LoginUserErrors.IncorrectPasswordError, LoginUserController returns 409 Conflict', async () => {
    const mockRequest = httpMocks.createRequest({
      body: loginUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new LoginUserErrors.IncorrectPasswordError())
      )
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(409)
  })

  test('When the LoginUserUseCase returns AppError.UnexpectedError, LoginUserController returns 500 Internal Server Error', async () => {
    const mockRequest = httpMocks.createRequest({
      body: loginUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(LoginUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))
    const loginUserController = buildController()

    const result = await loginUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(500)
  })
})
