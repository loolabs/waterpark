export namespace GetUserErrors {
    export class GetUserByIdFailedError {
      public message: string
      public constructor(id: string) {
        this.message = `No account with the id ${id} exists`
      }
    }
  }
  