import { Result } from '../../../../../../shared/core/result'
import { User } from '../../../../domain/entities/user'
import { UserEmail } from '../../../../domain/value-objects/user-email'
import { UserPassword } from '../../../../domain/value-objects/user-password'
import { CreateUserDTO } from '../create-user-dto'

const createUser = ({ email, password }: CreateUserDTO): User => {
  const userEmailResult = UserEmail.create(email)
  const userPasswordResult = UserPassword.create({ value: password, hashed: false })
  const results = [userEmailResult, userPasswordResult] as const
  if (!Result.resultsAllOk(results)) throw Result.getFirstError(results)
  const userResult = User.create({ email: results[0].value, password: results[1].value })
  if (userResult.isErr()) throw userResult.error
  return userResult.value
}

export { createUser }
