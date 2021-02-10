import httpMocks from 'node-mocks-http'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/routes/decoded-request'
import { User } from '../../../../domain/entities/user'
import { UserValueObjectErrors } from '../../../../domain/value-objects/errors'
import { CreateUserDTO } from '../create-user-dto'
import { CreateUserErrors } from '../create-user-errors'
import { CreateUserUseCase, CreateUserSuccess } from '../create-user-use-case'
import { buildController } from '../test-utils/build-controller'
import { createMockUser } from '../test-utils/create-user'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../../../../infra/repos/implementations/mikro-user-repo')
jest.mock('../create-user-use-case')

describe('CreateUserController', () => {
  let createUserDTO: CreateUserDTO
  let mockUser: User

  beforeAll(() => {
    createUserDTO = {
      email: 'john.doe@uwaterloo.ca',
      password: 'secret',
    }

    mockUser = createMockUser()
  })

  test('When the CreateUserUseCase returns Ok, the CreateUserController returns 200 OK', async () => {
    const mockRequest = httpMocks.createRequest({
      body: createUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    
    const useCaseResolvedValue: CreateUserSuccess = {
      user: mockUser,
      token: "testtoken"
    }

    jest.spyOn(CreateUserUseCase.prototype, 'execute').mockResolvedValue(Result.ok(useCaseResolvedValue))
    const createUserController = buildController()

    const result = await createUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(200)
  })

  test('When the CreateUserUseCase returns UserValueObjectErrors.InvalidEmail, CreateUserController returns 400 Bad Request', async () => {
    const mockRequest = httpMocks.createRequest({
      body: createUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new UserValueObjectErrors.InvalidEmail(createUserDTO.email)))
    const createUserController = buildController()

    const result = await createUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(400)
  })

  test('When the CreateUserUseCase returns UserValueObjectErrors.InvalidPassword, CreateUserController returns 400 Bad Request', async () => {
    const mockRequest = httpMocks.createRequest({
      body: createUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new UserValueObjectErrors.InvalidPassword(createUserDTO.password))
      )
    const createUserController = buildController()

    const result = await createUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(400)
  })

  test('When the CreateUserUseCase returns CreateUserErrors.EmailAlreadyExistsError, CreateUserController returns 409 Conflict', async () => {
    const mockRequest = httpMocks.createRequest({
      body: createUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new CreateUserErrors.EmailAlreadyExistsError(createUserDTO.email))
      )
    const createUserController = buildController()

    const result = await createUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(409)
  })

  test('When the CreateUserUseCase returns AppError.UnexpectedError, CreateUserController returns 500 Internal Server Error', async () => {
    const mockRequest = httpMocks.createRequest({
      body: createUserDTO,
    }) as DecodedExpressRequest
    const mockResponse = httpMocks.createResponse()
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))
    const createUserController = buildController()

    const result = await createUserController.executeImpl(mockRequest, mockResponse)

    expect(result.statusCode).toBe(500)
  })
})
