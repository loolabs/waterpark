import * as t from 'io-ts'

export interface User {
  email: string
  isEmailVerified?: boolean
}

export const tUser: t.Type<User> = t.intersection([
  t.strict({
    email: t.string,
  }),
  t.partial({
    isEmailVerified: t.boolean,
  }),
])
