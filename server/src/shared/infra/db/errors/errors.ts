export namespace DBError {
  export class UserNotFoundError {
    public message: string
    public constructor(identifier: string) {
      this.message = `The user with attribute (id/email) ${identifier} could not be found.`
    }
  }
  export class PasswordsNotEqualError {
    public message: string
    public constructor(identifier: string) {
      this.message = `An invalid password for the user with attribute (id/email) ${identifier} was provided.`
    }
  }
}


export type DBErrors = DBError.UserNotFoundError | DBError.PasswordsNotEqualError