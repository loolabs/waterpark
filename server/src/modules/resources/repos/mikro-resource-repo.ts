import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'
import { BaseResourceEntity } from '../../../shared/infra/db/entities/places/place.entity'
import { ResourceRepo, ResourceOptions, ResourceRepoError } from './resource-repo'

export class MikroResourceRepo<Resource, ResourceEntity extends BaseResourceEntity>
  implements ResourceRepo<Resource>
{
  protected resourceEntityRepo: EntityRepository<ResourceEntity>
  protected toDomain: (_: ResourceEntity) => Resource

  constructor(
    resourceEntityRepo: EntityRepository<ResourceEntity>,
    resourceMap: { toDomain: (_: ResourceEntity) => Resource }
  ) {
    this.resourceEntityRepo = resourceEntityRepo
    this.toDomain = resourceMap.toDomain
  }

  async getAll({ mustIncludeReviews }: ResourceOptions = {}): Promise<
    Result<Array<Resource>, ResourceRepoError>
  > {
    const populateFields = ['tags']
    if (mustIncludeReviews === true) {
      populateFields.push('reviews')
    }

    try {
      const resourceEntities: Array<ResourceEntity> = await this.resourceEntityRepo.find(
        {},
        {
          populate: populateFields,
          orderBy: { place: { name: QueryOrder.ASC_NULLS_LAST } },
        }
      )
      const resources = await Promise.all(resourceEntities.map(this.toDomain))
      return Result.ok(resources)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new ResourceRepoError(String(err)))
    }
  }

  async getById(
    id: string,
    { mustIncludeReviews }: ResourceOptions = {}
  ): Promise<Result<Resource, ResourceRepoError>> {
    const populateFields = ['tags']
    if (mustIncludeReviews === true) {
      populateFields.push('reviews')
    }

    try {
      const resourceEntity = await this.resourceEntityRepo.findOne(
        { place: { id } } as any, // Mikro fails to recognize certain filter queries as properly typed
        { populate: populateFields }
      )
      if (resourceEntity === null) {
        // TODO: Create proper error classes
        return Result.err(new AppError.UnexpectedError('Resource not found'))
      }
      const resource = await this.toDomain(resourceEntity)
      return Result.ok(resource)
    } catch (err: unknown) {
      // TODO: Fix unknown type error
      return Result.err(new ResourceRepoError(String(err)))
    }
  }
}
