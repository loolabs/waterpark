import { mocks } from '../../../../../../test-utils'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { UserValueObjectErrors } from '../../../../domain/value-objects/errors'
import { CreateUserController } from '../create-user-controller'
import { CreateUserDTO } from '../create-user-dto'
import { CreateUserErrors } from '../create-user-errors'
import { CreateUserSuccess, CreateUserUseCase } from '../create-user-use-case'
import { UserMap } from '../../../../mappers/user-map'

// TODO: how to show developer these mocks are necessary when building a controller? aka must be synced with buildController()
jest.mock('../create-user-use-case')

describe('CreateUserController', () => {
  const createUserDTO: CreateUserDTO = {
    email: 'john.doe@uwaterloo.ca',
    password: 'secret',
  }
  let createUserController: CreateUserController
  beforeAll(async () => {
    const createUser = await mocks.mockCreateUser()
    createUserController = createUser.createUserController
  })

  test('When the CreateUserUseCase returns Ok, the CreateUserController returns 200 OK', async () => {
    const user = mocks.mockUser(createUserDTO)

    const useCaseResolvedValue: CreateUserSuccess = {
      user: UserMap.toDTO(user),
      token: "testtoken"
    }
    
    jest.spyOn(CreateUserUseCase.prototype, 'execute').mockResolvedValue(Result.ok(useCaseResolvedValue))

    const { req, res } = mocks.mockHandlerParams(createUserDTO)
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('When the CreateUserUseCase returns UserValueObjectErrors.InvalidEmail, CreateUserController returns 400 Bad Request', async () => {
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new UserValueObjectErrors.InvalidEmail(createUserDTO.email)))

    const { req, res } = mocks.mockHandlerParams(createUserDTO)
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(400)
  })

  test('When the DTO is invalid, CreateUserController returns 400 Bad Request', async () => {
    const invalidCreateUserDTO = Object.assign({}, createUserDTO) as any // shallow copy
    invalidCreateUserDTO.email = 42

    const { req, res } = mocks.mockHandlerParams(invalidCreateUserDTO)
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(400)
  })

  test('When the CreateUserUseCase returns UserValueObjectErrors.InvalidPassword, CreateUserController returns 400 Bad Request', async () => {
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new UserValueObjectErrors.InvalidPassword(createUserDTO.password))
      )

    const { req, res } = mocks.mockHandlerParams(createUserDTO)
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(400)
  })

  test('When the CreateUserUseCase returns CreateUserErrors.EmailAlreadyExistsError, CreateUserController returns 409 Conflict', async () => {
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(
        Result.err(new CreateUserErrors.EmailAlreadyExistsError(createUserDTO.email))
      )

    const { req, res } = mocks.mockHandlerParams(createUserDTO)
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(409)
  })

  test('When the CreateUserUseCase returns AppError.UnexpectedError, CreateUserController returns 500 Internal Server Error', async () => {
    jest
      .spyOn(CreateUserUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Unexpected error')))

    const { req, res } = mocks.mockHandlerParams(createUserDTO)
    await createUserController.execute(req, res)
    expect(res.statusCode).toBe(500)
  })
})
