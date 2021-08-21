import { UseCaseWithDTO } from '../../../../shared/app/use-case-with-dto'
import { AppError } from '../../../../shared/core/app-error'
import { Result } from '../../../../shared/core/result'
import { ResourceRepo } from '../../repos'

type GetResourceByIdUseCaseError = AppError.UnexpectedError

export type DTO = {
  id: string
}
type GetResourceByIdUseCaseResponse<ResourceDTO> = Result<ResourceDTO, GetResourceByIdUseCaseError>

export class GetResourceByIdUseCase<Resource, ResourceDTO>
  implements UseCaseWithDTO<DTO, GetResourceByIdUseCaseResponse<ResourceDTO>>
{
  protected resourceRepo: ResourceRepo<Resource>
  protected toDTO: (_: Resource) => ResourceDTO

  constructor(
    resourceRepo: ResourceRepo<Resource>,
    resourceMap: {
      toDTO: (_: Resource) => ResourceDTO
    }
  ) {
    this.resourceRepo = resourceRepo
    this.toDTO = resourceMap.toDTO
  }

  async execute({ id }: DTO): Promise<GetResourceByIdUseCaseResponse<ResourceDTO>> {
    const result = await this.resourceRepo.getById(id, {
      mustIncludeReviews: true,
    })
    if (result.isOk()) {
      const resourceDTO = this.toDTO(result.value)
      return Result.ok(resourceDTO)
    } else {
      return result
    }
  }
}
