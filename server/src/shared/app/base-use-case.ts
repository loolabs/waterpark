export interface BaseUseCase<DTO, Response> {
  execute(dto: DTO): Promise<Response> | Response
}
