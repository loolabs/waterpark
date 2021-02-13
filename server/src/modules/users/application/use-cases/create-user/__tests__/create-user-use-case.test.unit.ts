import { Err, Result } from '../../../../../../shared/core/result'
import { User } from '../../../../domain/entities/user'
import { UserValueObjectErrors } from '../../../../domain/value-objects/errors'
import { MikroUserRepo } from '../../../../infra/repos/implementations/mikro-user-repo'
import { UserRepo } from '../../../../infra/repos/user-repo'
import { CreateUserDTO } from '../create-user-dto'
import { CreateUserUseCase } from '../create-user-use-case'
import { createMockUser } from '../test-utils/create-user'

jest.mock('../../../../infra/repos/implementations/mikro-user-repo')

describe('CreateUserUseCase', () => {
  test('When executed with valid DTO, should save the user and return an Ok', async () => {
    const createUserDTO: CreateUserDTO = {
      email: 'john.doe@uwaterloo.ca',
      password: 'secret',
    }
    const userEntityRepo = undefined
    const fakeMikroUserRepo = new MikroUserRepo(userEntityRepo)
    const createUserUseCase = new CreateUserUseCase(fakeMikroUserRepo)

    const createUserResult = await createUserUseCase.execute(createUserDTO)

    expect(fakeMikroUserRepo.save).toBeCalled()
    expect(createUserResult.isOk()).toBe(true)
  })

  test('When executed with invalid email, should return UserValueObjectErrors.InvalidEmail', async () => {
    const createUserDtoInvalidEmail: CreateUserDTO = {
      email: 'john.doe@uft.ca',
      password: 'secret',
    }
    const userEntityRepo = undefined
    const fakeMikroUserRepo = new MikroUserRepo(userEntityRepo)
    const createUserUseCase = new CreateUserUseCase(fakeMikroUserRepo)

    const createUserResult = await createUserUseCase.execute(createUserDtoInvalidEmail)

    expect(createUserResult.isErr()).toBe(true)
    const createUserErr = createUserResult as Err<User, UserValueObjectErrors.InvalidEmail>
    expect(createUserErr.error instanceof UserValueObjectErrors.InvalidEmail).toBe(true)
  })

  test('When executed with invalid password, should return UserValueObjectErrors.InvalidPassword', async () => {
    const createUserDtoInvalidPassword: CreateUserDTO = {
      email: 'john.doe@uwaterloo.ca',
      password: '2shrt',
    }
    const userEntityRepo = undefined
    const fakeMikroUserRepo = new MikroUserRepo(userEntityRepo)
    const createUserUseCase = new CreateUserUseCase(fakeMikroUserRepo)

    const createUserResult = await createUserUseCase.execute(createUserDtoInvalidPassword)

    expect(createUserResult.isErr()).toBe(true)
    const createUserErr = createUserResult as Err<User, UserValueObjectErrors.InvalidPassword>
    expect(createUserErr.error instanceof UserValueObjectErrors.InvalidPassword).toBe(true)
  })

  test('When executed with email that already exists, should return CreateUserErrors.EmailAlreadyExistsError', async () => {
    const createUserDTO: CreateUserDTO = {
      email: 'john.doe@uwaterloo.ca',
      password: '2shrt',
    }
    const user = createMockUser()
    const fakeUserRepo: UserRepo = {
      exists: async () => Result.ok(true),
      getUserByUserId: async () => Result.ok(user),
      getUserByUserEmailandUserPassword: async () => Result.ok(user),
      save: async () => {},
    }
    const createUserUseCase = new CreateUserUseCase(fakeUserRepo)

    const createUserResult = await createUserUseCase.execute(createUserDTO)

    expect(createUserResult.isErr()).toBe(true)
    const createUserErr = createUserResult as Err<User, UserValueObjectErrors.InvalidPassword>
    expect(createUserErr.error instanceof UserValueObjectErrors.InvalidPassword).toBe(true)
  })
})
