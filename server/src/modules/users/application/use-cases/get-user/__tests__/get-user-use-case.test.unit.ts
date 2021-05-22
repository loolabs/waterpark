import { Err } from '../../../../../../shared/core/result'
import { User } from '../../../../domain/entities/user'
import { GetUserDTO } from '../get-user-dto'
import { GetUserUseCase } from '../get-user-use-case'
import { GetUserErrors } from '../get-user-errors'
import { mocks } from '../../../../../../test-utils'

jest.mock('../../../../infra/repos/implementations/mikro-user-repo')

describe('GetUserUseCase', () => {
  let getUserDTO: GetUserDTO
  let getUserUseCase: GetUserUseCase

  beforeAll(async () => {
    const getUser = await mocks.mockGetUser()
    getUserUseCase = getUser.getUserUseCase
  })

  beforeEach(() => {
    getUserDTO = {
      userId: 'correctUserId'
    }
  })

  test('When executed with valid DTO, should return the user', async () => {
    const getUserResult = await getUserUseCase.execute(getUserDTO)

    expect(getUserResult.isOk()).toBe(true)
  })

  test('When executed with invalid userId, should return GetUserErrors.GetUserByIdFailedError', async () => {
    getUserDTO.userId = 'incorrectUserId'
    const getUserResult = await getUserUseCase.execute(getUserDTO)

    expect(getUserResult.isErr()).toBe(true)
    const getUserErr = getUserResult as Err<User, GetUserErrors.GetUserByIdFailedError>
    expect(getUserErr.error instanceof GetUserErrors.GetUserByIdFailedError).toBe(true)
  })
})
