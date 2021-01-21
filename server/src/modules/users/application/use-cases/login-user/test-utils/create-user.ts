import { Result } from '../../../../../../shared/core/result'
import { User } from '../../../../domain/entities/user'
import { UserEmail } from '../../../../domain/value-objects/user-email'
import { UserPassword } from '../../../../domain/value-objects/user-password'

export const createMockUser = (): User => {
  const emailResult = UserEmail.create('john.doe@uwaterloo.ca')
  const passwordResult = UserPassword.create({
    value: 'secret',
    hashed: false,
  })

  const results = [emailResult, passwordResult] as const
  if (!Result.resultsAllOk(results)) {
    throw new Error('Email and password should be valid')
  }

  const email = results[0].value
  const password = results[1].value

  const userResult = User.create({
    email,
    password,
  })

  if (userResult.isErr()) throw new Error('Something went wrong with User creation')

  return userResult.value
}
