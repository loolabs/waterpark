import { UseCaseWithoutDTO } from '../../../../shared/app/use-case-without-dto'
import { AppError } from '../../../../shared/core/app-error'
import { Result } from '../../../../shared/core/result'
import { ResourceRepo } from '../../repos'

type GetAllResourcesUseCaseError = AppError.UnexpectedError

type GetAllResourcesUseCaseResponse<ResourceDTO> = Result<
  Array<ResourceDTO>,
  GetAllResourcesUseCaseError
>

export class GetAllResourcesUseCase<Resource, ResourceDTO>
  implements UseCaseWithoutDTO<Promise<GetAllResourcesUseCaseResponse<ResourceDTO>>>
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

  async execute(): Promise<GetAllResourcesUseCaseResponse<ResourceDTO>> {
    const result = await this.resourceRepo.getAll()
    if (result.isOk()) {
      const resourceDTOs: Array<ResourceDTO> = result.value.map((resource) => this.toDTO(resource))
      return Result.ok(resourceDTOs)
    } else {
      return result
    }
  }
}
