import { Club } from '../../../domain/entities/club'
import { ClubEntity } from '../../../../../shared/infra/db/entities/club.entity'
import { ClubMap } from '../../../mappers/club-map'
import { ClubRepo } from '../club-repo'
import { Result } from '../../../../../shared/core/result'
import { AppError } from '../../../../../shared/core/app-error'

export class MockClubRepo implements ClubRepo {
  constructor(protected eventEntities: Array<ClubEntity> = []) {}

  async getAllClubs(): Promise<Result<Array<Club>, AppError.UnexpectedError>> {
    return Result.ok(this.eventEntities.map(ClubMap.toDomain))
  }
}
