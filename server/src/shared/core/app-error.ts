export namespace AppError {
  export class UnexpectedError {
    public message: string
    public constructor(error: string) {
      this.message = error
    }
  }
}
