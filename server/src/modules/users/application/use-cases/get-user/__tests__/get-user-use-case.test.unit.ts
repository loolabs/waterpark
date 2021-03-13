import { Err, Result } from '../../../../../../shared/core/result'
import { User } from '../../../../domain/entities/user'
import { MikroUserRepo } from '../../../../infra/repos/implementations/mikro-user-repo'
import { GetUserDTO } from '../get-user-dto'
import { GetUserUseCase } from '../get-user-use-case'
import { createMockUser } from '../../create-user/test-utils/create-user'
import { GetUserErrors } from '../get-user-errors'
import { DBError } from '../../../../../../shared/infra/db/errors/errors'

jest.mock('../../../../infra/repos/implementations/mikro-user-repo')

describe('GetUserUseCase', () => {
  test('When executed with valid DTO, should return the user', async () => {
    const getUserDTO: GetUserDTO = {
      userId: "ypqlgViyEIU9gxW1"
    }
    const user = createMockUser()
    const fakeMikroUserRepo: MikroUserRepo = {
      exists: async () => Result.ok(false),
      getUserByUserId: async () => Result.ok(user),
      getUserByUserEmail: async () => Result.ok(user),
      getUserByUserEmailandUserPassword: async () => Result.ok(user),
      save: async () => {},
      findAll: async () => Result.ok([user]),
    }

    const getUserUseCase = new GetUserUseCase(fakeMikroUserRepo)

    const getUserResult = await getUserUseCase.execute(getUserDTO)

    expect(getUserResult.isOk()).toBe(true)
  })

  test('When executed with invalid userId, should return GetUserErrors.GetUserByIdFailedError', async () => {
    const getUserDTOInvalidUserId: GetUserDTO = {
        userId: "xx12"
    }
    const user = createMockUser()
    const fakeMikroUserRepo: MikroUserRepo = {
        exists: async () => Result.ok(false),
        getUserByUserId: async () => Result.err(new DBError.UserNotFoundError(getUserDTOInvalidUserId.userId)),
        getUserByUserEmail: async () => Result.ok(user),
        getUserByUserEmailandUserPassword: async () => Result.ok(user),
        save: async () => {},
        findAll: async () => Result.ok([user]),
    }
    const getUserUseCase = new GetUserUseCase(fakeMikroUserRepo)

    const getUserResult = await getUserUseCase.execute(getUserDTOInvalidUserId)

    expect(getUserResult.isErr()).toBe(true)
    const getUserErr = getUserResult as Err<User, GetUserErrors.GetUserByIdFailedError>
    expect(getUserErr.error instanceof GetUserErrors.GetUserByIdFailedError).toBe(true)
  })
})