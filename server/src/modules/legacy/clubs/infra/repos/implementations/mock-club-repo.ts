import { Club } from '../../../domain/entities/club'
import { ClubRepo } from '../club-repo'
import { Result } from '../../../../../../shared/core/result'
import { AppError } from '../../../../../../shared/core/app-error'

export class MockClubRepo implements ClubRepo {
  constructor(protected clubs: Array<Club> = []) {}

  async getAllClubs(): Promise<Result<Array<Club>, AppError.UnexpectedError>> {
    return Result.ok(this.clubs)
  }
}
