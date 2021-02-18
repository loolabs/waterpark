export interface UseCaseWithoutDTO<Response> {
  execute(): Promise<Response> | Response
}
