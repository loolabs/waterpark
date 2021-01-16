export namespace GetAllClubsErrors {
  export class EmailAlreadyExistsError {
    public message: string
    public constructor(email: string) {
      this.message = `A club with the email ${email} already exists`
    }
  }
    export class NameAlreadyExistsError {
    public message: string
    public constructor(name: string) {
      this.message = `A club with the name ${name} already exists`
    }
  }
}
