import { Result } from '../../../shared/core/result'
import { AppError } from '../../../shared/core/app-error'
import { PlaceOptions } from '../../places/repos/place-repo'

export type ResourceOptions = PlaceOptions

export class ResourceRepoError extends AppError.UnexpectedError {}

export abstract class ResourceRepo<Resource> {
  abstract getAll(options?: ResourceOptions): Promise<Result<Array<Resource>, ResourceRepoError>>

  abstract getById(
    id: string,
    options?: ResourceOptions
  ): Promise<Result<Resource, ResourceRepoError>>
}
