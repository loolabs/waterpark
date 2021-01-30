export namespace AuthenticateUserErrors {
    export class AuthenticationFailedError {
      public message: string
      public constructor(email: string) {
        this.message = `No account with the ${email} exists`
      }
    }
  }
  