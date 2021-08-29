import { mocks } from '../../../../../../test-utils'
import { Err } from '../../../../../../shared/core/result'
import { User } from '../../../../domain/entities/user'
import { UserRepo } from '../../../../infra/repos/user-repo'
import { UserValueObjectErrors } from '../../../../domain/value-objects/errors'
import { CreateUserDTO } from '../create-user-dto'
import { CreateUserErrors } from '../create-user-errors'
import { CreateUserUseCase } from '../create-user-use-case'

jest.mock('../../../../infra/repos/implementations/mock-user-repo')

describe('CreateUserUseCase', () => {
  let createUserDTO: CreateUserDTO
  let userRepo: UserRepo
  let createUserUseCase: CreateUserUseCase

  beforeAll(async () => {
    const createUser = mocks.mockCreateUser()
    userRepo = createUser.userRepo
    createUserUseCase = createUser.createUserUseCase
  })

  beforeEach(() => {
    createUserDTO = {
      email: 'john.doe@uwaterloo.ca',
      password: 'secret',
    }
  })

  test('When executed with valid DTO, should save the user and return an Ok', async () => {
    const createUserResult = await createUserUseCase.execute(createUserDTO)

    expect(userRepo.save).toBeCalled()
    expect(createUserResult.isOk()).toBe(true)
  })

  test('When executed with invalid email, should return UserValueObjectErrors.InvalidEmail', async () => {
    createUserDTO.email = 'john.doe@mail.utoronto.ca'

    const createUserResult = await createUserUseCase.execute(createUserDTO)

    expect(createUserResult.isErr()).toBe(true)
    const createUserErr = createUserResult as Err<User, UserValueObjectErrors.InvalidEmail>
    expect(createUserErr.error instanceof UserValueObjectErrors.InvalidEmail).toBe(true)
  })

  test('When executed with invalid password, should return UserValueObjectErrors.InvalidPassword', async () => {
    createUserDTO.password = '2shrt'

    const createUserResult = await createUserUseCase.execute(createUserDTO)

    expect(createUserResult.isErr()).toBe(true)
    const createUserErr = createUserResult as Err<User, UserValueObjectErrors.InvalidPassword>
    expect(createUserErr.error instanceof UserValueObjectErrors.InvalidPassword).toBe(true)
  })

  test('When executed with email that already exists, should return CreateUserErrors.EmailAlreadyExistsError', async () => {
    jest.spyOn(userRepo, 'exists').mockResolvedValue(true)

    const createUserResult = await createUserUseCase.execute(createUserDTO)

    expect(createUserResult.isErr()).toBe(true)
    const createUserErr = createUserResult as Err<User, CreateUserErrors.EmailAlreadyExistsError>
    expect(createUserErr.error instanceof CreateUserErrors.EmailAlreadyExistsError).toBe(true)
  })
})
