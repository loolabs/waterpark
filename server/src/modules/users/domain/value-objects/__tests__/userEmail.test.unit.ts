import { Err } from '../../../../../shared/core/result'
import { UserValueObjectErrors } from '../errors'
import { UserEmail } from '../user-email'

describe('UserEmail ValueObject', () => {
  const validEmails = [
    'email@uwaterloo.ca',
    'firstname.lastname@uwaterloo.ca',
    'firstname+lastname@uwaterloo.ca',
    '"email"@uwaterloo.ca',
    '1234567890@uwaterloo.ca',
    'email@uwaterloo.ca',
    '_______@uwaterloo.ca',
    'email@uwaterloo.ca',
    'email@uwaterloo.ca',
    'email@uwaterloo.ca',
    'firstname-lastname@uwaterloo.ca',
  ]

  for (const email of validEmails) {
    test(`When created with a valid email (${email}), should return Ok`, () => {
      const userEmailResult = UserEmail.create(email)
      expect(userEmailResult.isOk()).toBe(true)
    })
  }

  const invalidEmails = [
    '',
    'invalid',
    '',
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@example.web',
    'email@111.222.333.44444',
    'email@example..com',
    'Abc..123@example.com',
  ]

  for (const email of invalidEmails) {
    test(`When created with an invalid email (${email}), should return Err: UserValueObjectErrors.InvalidEmail`, () => {
      const userEmailResult = UserEmail.create(email)
      expect(userEmailResult.isErr()).toBe(true)
      const userEmailErr = userEmailResult as Err<UserEmail, UserValueObjectErrors.InvalidEmail>
      expect(userEmailErr.error instanceof UserValueObjectErrors.InvalidEmail).toBe(true)
    })
  }

  const validEmailsThatArentWaterloo = [
    'email@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    'email@[123.123.123.123]',
    '"email"@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'firstname-lastname@example.com',
  ]

  for (const email of validEmailsThatArentWaterloo) {
    test(`When created with an non-UW valid email (${email}), should return Err: UserValueObjectErrors.InvalidEmail`, () => {
      const userEmailResult = UserEmail.create(email)
      expect(userEmailResult.isErr()).toBe(true)
      const userEmailErr = userEmailResult as Err<UserEmail, UserValueObjectErrors.InvalidEmail>
      expect(userEmailErr.error instanceof UserValueObjectErrors.InvalidEmail).toBe(true)
    })
  }
})
