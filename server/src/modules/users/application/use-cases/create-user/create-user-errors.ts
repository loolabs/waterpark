export namespace CreateUserErrors {
  export class EmailAlreadyExistsError {
    public message: string
    public constructor(email: string) {
      this.message = `An account with the email ${email} already exists`
    }
  }
}
