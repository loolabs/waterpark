import { ResourceRepo, ResourceOptions, ResourceRepoError } from './resource-repo'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'
import { BaseResourceEntity } from '../../../shared/infra/db/entities/places/place.entity'

export class MockResourceRepo<Resource, ResourceEntity extends BaseResourceEntity>
  implements ResourceRepo<Resource>
{
  // the mock repo ignores ResourceOptions.mustIncludeReviews

  protected resourceEntities: Array<ResourceEntity>
  protected resourceEntitiesById: Map<string, ResourceEntity>
  protected toDomain: (_: ResourceEntity) => Resource

  constructor(
    resourceEntities: Array<ResourceEntity> = [],
    resourceMap: { toDomain: (_: ResourceEntity) => Resource }
  ) {
    this.resourceEntities = resourceEntities
    this.resourceEntitiesById = new Map(resourceEntities.map((re) => [re.place.id, re]))
    this.toDomain = resourceMap.toDomain
  }

  async getAll(
    _options: ResourceOptions = {}
  ): Promise<Result<Array<Resource>, ResourceRepoError>> {
    return Result.ok(this.resourceEntities.map(this.toDomain))
  }

  async getById(
    id: string,
    _options: ResourceOptions = {}
  ): Promise<Result<Resource, ResourceRepoError>> {
    const resourceEntity = this.resourceEntitiesById.get(id)
    if (resourceEntity === undefined) {
      return Result.err(new AppError.UnexpectedError('Resource not found')) // TODO: proper error classes
    }
    const washroom = this.toDomain(resourceEntity)
    return Result.ok(washroom)
  }
}
