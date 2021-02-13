export namespace DBError {
  export class UserNotFoundError {
    public message: string
    public constructor(identifier: string) {
      this.message = `The user with attribute (id/email) ${identifier} could not be found.`
    }
  }
}


export type DBErrors = DBError.UserNotFoundError