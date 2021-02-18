import { Club } from '../../domain/entities/club'
import { Result } from '../../../../shared/core/result'
import { AppError } from '../../../../shared/core/app-error'

export abstract class ClubRepo {
  abstract getAllClubs(): Promise<Result<Array<Club>, AppError.UnexpectedError>>
}
