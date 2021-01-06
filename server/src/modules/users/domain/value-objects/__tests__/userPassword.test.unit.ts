import { Err } from '../../../../../shared/core/result'
import { UserValueObjectErrors } from '../errors'
import { UserPassword } from '../user-password'

describe('UserPassword ValueObject', () => {
  test('When created with a password value that is too small, it returns UserValueObjectErrors.InvalidPassword', () => {
    const tooSmallOfAPassword = '2shrt'
    const hashed = false

    const passwordResult = UserPassword.create({
      value: tooSmallOfAPassword,
      hashed,
    })

    expect(passwordResult.isErr())
    const passwordErr = passwordResult as Err<UserPassword, UserValueObjectErrors.InvalidPassword>
    expect(passwordErr.error instanceof UserValueObjectErrors.InvalidPassword).toBe(true)
  })

  test('When a Password is asked for hash value, it returns the hashed value instead of raw password', async () => {
    const rawPassword = 'alongenoughpassword'
    const hashed = false

    const passwordResult = UserPassword.create({
      value: rawPassword,
      hashed,
    })

    expect(passwordResult.isOk())
    if (passwordResult.isErr()) throw new Error('Password result should be isOk, not isErr')
    const password = passwordResult.value
    const hashedValue = await password.getHashedValue()
    expect(hashedValue).not.toBe(rawPassword)
  })

  test('When a Password is asked for hash status, it returns correct status', async () => {
    const rawPassword = 'alongenoughpassword'
    const hashed = false

    const passwordResult = UserPassword.create({
      value: rawPassword,
      hashed,
    })

    expect(passwordResult.isOk())
    if (passwordResult.isErr()) throw new Error('Password result should be isOk, not isErr')
    const password = passwordResult.value
    expect(password.isAlreadyHashed()).toBe(false)
  })

  test('When a Password is compared with its original value, it reports them to be the same', () => {
    const rawPassword = 'alongenoughpassword'
    const hashed = false

    const passwordResult = UserPassword.create({
      value: rawPassword,
      hashed,
    })

    expect(passwordResult.isOk())
    if (passwordResult.isErr()) throw new Error('Result should be isOk, not isErr')
    const password = passwordResult.value
    expect(password.comparePassword(rawPassword)).resolves.toBe(true)
  })

  test('When a Password is compared with a different value, it reports them to be different', () => {
    const rawPassword = 'alongenoughpassword'
    const hashed = false

    const passwordResult = UserPassword.create({
      value: rawPassword,
      hashed,
    })

    expect(passwordResult.isOk())
    if (passwordResult.isErr()) throw new Error('Password result should be isOk, not isErr')
    const password = passwordResult.value
    expect(password.comparePassword('randompassword')).resolves.toBe(false)
  })
})
