import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { DB } from '../../../../../shared/infra/db'
import { ClubEntity } from '../../../../../shared/infra/db/entities/club.entity'
import { Club } from '../../../domain/entities/club'
// import { ClubEmail } from '../../../domain/value-objects/club-email'
import { ClubMap } from '../../../mappers/club-map'
import { ClubRepo } from '../club-repo'

export class MikroClubRepo implements ClubRepo {
  // TODO: same coupling error as equivalent users version of this file
    private clubsEntityRepo: EntityRepository<ClubEntity> | undefined
    
  constructor(clubRepo: EntityRepository<ClubEntity> | undefined) {
    this.clubsEntityRepo = clubRepo
  }

  async exists(name: string): Promise<boolean> {
    const club = await DB.clubsEntityRepo.findOne({ name })
    return club !== null
  }

  async getClubByClubId(clubId: string): Promise<Club> {
    const club = await DB.clubsEntityRepo.findOne({ id: clubId })
    if (!club) throw new Error() // TODO handle error
    return ClubMap.toDomain(club)
  }

  async getAllClubs(): Promise<Club[]>{
    const clubEntities  = await DB.clubsEntityRepo.find({}, { orderBy: { name: QueryOrder.DESC_NULLS_LAST } })
    if (clubEntities === undefined)
      throw new Error() // TODO handle error
    const clubs = clubEntities.map((clubEntity: ClubEntity): Club => ClubMap.toDomain(clubEntity))
    return clubs;
  }

  async save(club: Club): Promise<void> {
    console.log(this.clubsEntityRepo)
    const exists = await this.exists(club.name)

    if (exists) return

    const clubEntity = await ClubMap.toPersistence(club)

    DB.clubsEntityRepo.persist(clubEntity)
    DB.clubsEntityRepo.flush()
  }

  async findAll(): Promise<Array<Club>> {
    const clubs = await DB.clubsEntityRepo.findAll()
    return clubs.map((club) => ClubMap.toDomain(club))
  }
}
