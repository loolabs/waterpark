export interface UseCaseWithDTO<DTO, Response> {
  execute(dto: DTO): Promise<Response>
}
