import * as t from 'io-ts'

export interface CreateUser {
  email: string
  password: string
}

export const tCreateUser: t.Type<CreateUser> = t.strict({
  email: t.string,
  password: t.string,
})
