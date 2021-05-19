import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { Club } from '../../../domain/entities/club'
import { ClubEntity } from '../../../../../shared/infra/db/entities/club.entity'
import { ClubMap } from '../../../mappers/club-map'
import { ClubRepo } from '../club-repo'
import { Result } from '../../../../../shared/core/result'
import { AppError } from '../../../../../shared/core/app-error'

export class MikroClubRepo implements ClubRepo {
  constructor(protected clubsEntityRepo: EntityRepository<ClubEntity>) {}

  async getAllClubs(): Promise<Result<Array<Club>, AppError.UnexpectedError>> {
    try {
      const clubEntities: Array<ClubEntity> = await this.clubsEntityRepo.find(
        {},
        {
          populate: ['tags', 'events', 'events.tags'],
          orderBy: { name: QueryOrder.ASC_NULLS_LAST },
        }
      )
      const clubs = clubEntities.map(ClubMap.toDomain)
      return Result.ok(clubs)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
