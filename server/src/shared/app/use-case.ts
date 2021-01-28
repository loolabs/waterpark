export interface BaseUseCase<Request, Response> {
  execute(request?: Request): Promise<Response> | Response
}
