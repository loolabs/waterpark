export namespace AuthenticateUserErrors {
    export class AuthenticationFailedError {
      public message: string
      public constructor(email: string, message: string) {
        this.message = `Authentication for user with ${email} failed: ${message}`
      }
    }
  }
  