import { Club } from '../../domain/entities/club'
import { Result } from '../../../../shared/core/result'
import { AppError } from '../../../../shared/core/app-error'

export abstract class ClubRepo {
  abstract exists(name: string): Promise<boolean>
  abstract getAllClubs(): Promise<Result<Array<Club>, AppError.UnexpectedError>>
}
