import httpMocks from 'node-mocks-http'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/routes/decoded-request'
import { UserValueObjectErrors } from '../../../../domain/value-objects/errors'
import { CreateUserDTO } from '../create-user-dto'
import { CreateUserErrors } from '../create-user-errors'
import { CreateUserUseCase } from '../create-user-use-case'
import { createUser } from '../test-utils/create-user'
import { setup } from '../test-utils/setup'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../create-user-use-case')

describe('CreateUserController', () => {
  const createUserDTO: CreateUserDTO = {
    email: 'john.doe@uwaterloo.ca',
    password: 'secret',
  }
  const createHttpMock = (body: any) => {
    const req = httpMocks.createRequest({ body }) as DecodedExpressRequest
    const res = httpMocks.createResponse()
    return { req, res }
  }

  test('When the CreateUserUseCase returns Ok, the CreateUserController returns 200 OK', async () => {
    const { req, res } = createHttpMock(createUserDTO)
    const user = createUser(createUserDTO)
    jest.spyOn(CreateUserUseCase.prototype, 'execute').mockResolvedValue(Result.ok(user))
    const { createUserController } = await setup()

    const result = await createUserController.execute(req, res)

    expect(result.statusCode).toBe(200)
  })

  test('When the CreateUserUseCase returns UserValueObjectErrors.InvalidEmail, CreateUserController returns 400 Bad Request', async () => {
    const { req, res } = createHttpMock(createUserDTO)
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new UserValueObjectErrors.InvalidEmail(createUserDTO.email)))
    const { createUserController } = await setup()

    const result = await createUserController.execute(req, res)

    expect(result.statusCode).toBe(400)
  })

  test('When the DTO is invalid, CreateUserController returns 400 Bad Request', async () => {
    const invalidCreateUserDTO = Object.assign({}, createUserDTO) as any // shallow copy
    invalidCreateUserDTO.email = 42
    const { req, res } = createHttpMock(invalidCreateUserDTO)
    const { createUserController } = await setup()

    const result = await createUserController.execute(req, res)
    expect(result.statusCode).toBe(400)
  })

  test('When the CreateUserUseCase returns UserValueObjectErrors.InvalidPassword, CreateUserController returns 400 Bad Request', async () => {
    const { req, res } = createHttpMock(createUserDTO)
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new UserValueObjectErrors.InvalidPassword(createUserDTO.password))
      )
    const { createUserController } = await setup()

    const result = await createUserController.execute(req, res)
    expect(result.statusCode).toBe(400)
  })

  test('When the CreateUserUseCase returns CreateUserErrors.EmailAlreadyExistsError, CreateUserController returns 409 Conflict', async () => {
    const { req, res } = createHttpMock(createUserDTO)
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new CreateUserErrors.EmailAlreadyExistsError(createUserDTO.email))
      )
    const { createUserController } = await setup()

    const result = await createUserController.execute(req, res)
    expect(result.statusCode).toBe(409)
  })

  test('When the CreateUserUseCase returns AppError.UnexpectedError, CreateUserController returns 500 Internal Server Error', async () => {
    const { req, res } = createHttpMock(createUserDTO)
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))
    const { createUserController } = await setup()

    const result = await createUserController.execute(req, res)
    expect(result.statusCode).toBe(500)
  })
})
