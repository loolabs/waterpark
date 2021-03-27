import { QueryOrder } from '@mikro-orm/core'
import { DB } from '../../../../../shared/infra/db'
import { ClubEntity } from '../../../../../shared/infra/db/entities/club.entity'
import { Club } from '../../../domain/entities/club'
import { ClubMap } from '../../../mappers/club-map'
import { ClubRepo } from '../club-repo'
import { Result } from '../../../../../shared/core/result'
import { AppError } from '../../../../../shared/core/app-error'

export class MikroClubRepo implements ClubRepo {
  async getAllClubs(): Promise<Result<Array<Club>, AppError.UnexpectedError>> {
    try {
      const clubEntities: Array<ClubEntity> = await DB.clubsEntityRepo.find(
        {},
        {
          populate: ['tags'],
          orderBy: { name: QueryOrder.DESC_NULLS_LAST },
        }
      )
      await clubEntities.forEach(
        async (club) =>
          await club.events.init({ orderBy: { startTime: QueryOrder.DESC_NULLS_LAST } })
      )
      const clubs = await Promise.all(clubEntities.map(ClubMap.toDomain))
      return Result.ok(clubs)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
