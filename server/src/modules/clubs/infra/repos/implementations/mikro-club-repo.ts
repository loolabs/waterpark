import { QueryOrder } from '@mikro-orm/core' // {EntityRepository, QueryOrder}
import { DB } from '../../../../../shared/infra/db'
import { ClubEntity } from '../../../../../shared/infra/db/entities/club.entity'
import { Club } from '../../../domain/entities/club'
import { ClubMap } from '../../../mappers/club-map'
import { ClubRepo } from '../club-repo'
import { Result } from "../../../../../shared/core/result"
import { AppError } from "../../../../../shared/core/app-error"

export class MikroClubRepo implements ClubRepo {
  // TODO: same coupling error as equivalent users version of this file

  // private clubsEntityRepo: EntityRepository<ClubEntity> | undefined

  // constructor(clubRepo: EntityRepository<ClubEntity> | undefined) {
  //   this.clubsEntityRepo = clubRepo
  // }

  async exists(name: string): Promise<boolean> {
    return (await DB.clubsEntityRepo.count({ name }) > 0);
  }

  async getClubByClubId(clubId: string): Promise<Club> {
    const club = await DB.clubsEntityRepo.findOne({ id: clubId })
    if (!club) throw new Error() // TODO handle error
    return ClubMap.toDomain(club)
  }

  async getAllClubs(): Promise<Result<Array<Club>, AppError.UnexpectedError>> {
    try {
      const clubEntities: Array<ClubEntity> = await DB.clubsEntityRepo.find(
        {},
        { orderBy: { name: QueryOrder.DESC_NULLS_LAST } }
      )
      const clubs = clubEntities.map((clubEntity: ClubEntity): Club => ClubMap.toDomain(clubEntity))
      return Result.ok(clubs)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
