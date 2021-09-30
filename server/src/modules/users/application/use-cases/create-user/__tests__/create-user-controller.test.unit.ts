import { mocks } from '../../../../../../test-utils'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { UserValueObjectErrors } from '../../../../domain/value-objects/errors'
import { CreateUserController } from '../create-user-controller'
import { CreateUserDTO } from '../create-user-dto'
import { CreateUserErrors } from '../create-user-errors'
import { CreateUserUseCase } from '../create-user-use-case'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../create-user-use-case')

describe('CreateUserController', () => {
  const body: CreateUserDTO = {
    email: 'john.doe@uwaterloo.ca',
    password: 'secret',
  }
  let createUserController: CreateUserController
  beforeAll(async () => {
    const createUser = mocks.mockCreateUser()
    createUserController = createUser.createUserController
  })

  test('When the CreateUserUseCase returns Ok, the CreateUserController returns 200 OK', async () => {
    const user = mocks.mockUser(body)
    jest.spyOn(CreateUserUseCase.prototype, 'execute').mockResolvedValue(Result.ok(user))

    const { req, res } = mocks.mockHandlerParams({ request: { body } })
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('When the CreateUserUseCase returns UserValueObjectErrors.InvalidEmail, CreateUserController returns 400 Bad Request', async () => {
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new UserValueObjectErrors.InvalidEmail(body.email)))

    const { req, res } = mocks.mockHandlerParams({ request: { body } })
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(400)
  })

  test('When the DTO is invalid, CreateUserController returns 400 Bad Request', async () => {
    const invalidBody = Object.assign({}, body) as any // shallow copy
    invalidBody.email = 42

    const { req, res } = mocks.mockHandlerParams({ request: { body: invalidBody } })
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(400)
  })

  test('When the CreateUserUseCase returns UserValueObjectErrors.InvalidPassword, CreateUserController returns 400 Bad Request', async () => {
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new UserValueObjectErrors.InvalidPassword(body.password)))

    const { req, res } = mocks.mockHandlerParams({ request: { body } })
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(400)
  })

  test('When the CreateUserUseCase returns CreateUserErrors.EmailAlreadyExistsError, CreateUserController returns 409 Conflict', async () => {
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new CreateUserErrors.EmailAlreadyExistsError(body.email)))

    const { req, res } = mocks.mockHandlerParams({ request: { body } })
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(409)
  })

  test('When the CreateUserUseCase returns AppError.UnexpectedError, CreateUserController returns 500 Internal Server Error', async () => {
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))

    const { req, res } = mocks.mockHandlerParams({ request: { body } })
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(500)
  })
})
