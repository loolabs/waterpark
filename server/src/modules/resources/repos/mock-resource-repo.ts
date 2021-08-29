import { ResourceRepo, ResourceOptions, ResourceRepoError } from './resource-repo'
import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'
import { UniqueEntityID } from '../../../shared/domain/unique-entity-id'
import { AggregateRoot } from '../../../shared/domain/aggregate-root'

export class MockResourceRepo<Resource extends AggregateRoot<any>>
  implements ResourceRepo<Resource>
{
  // the mock repo ignores ResourceOptions.mustIncludeReviews
  protected resources: Array<Resource>
  protected resourcesById: Map<UniqueEntityID, Resource>

  constructor(resources: Array<Resource> = []) {
    this.resources = resources
    this.resourcesById = new Map(resources.map((resource) => [resource.id, resource]))
  }

  async getAll(
    _options: ResourceOptions = {}
  ): Promise<Result<Array<Resource>, ResourceRepoError>> {
    return Result.ok(this.resources)
  }

  async getById(
    id: string,
    _options: ResourceOptions = {}
  ): Promise<Result<Resource, ResourceRepoError>> {
    const resource = this.resourcesById.get(new UniqueEntityID(id))
    if (resource === undefined) {
      return Result.err(new AppError.UnexpectedError('Resource not found')) // TODO: proper error classes
    }
    return Result.ok(resource)
  }
}
