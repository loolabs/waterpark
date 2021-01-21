export namespace LoginUserErrors {
  export class IncorrectPasswordError {
    public message: string
    public constructor() {
      this.message = `Incorrect email/password combination provided.`
    }
  }
}
