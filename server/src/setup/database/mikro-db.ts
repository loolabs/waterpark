import {
  MikroORM,
  EntityRepository,
  AbstractNamingStrategy,
  NamingStrategy,
  Options,
} from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import path from 'path'
import { Repos, DB } from './types'
import { ClubEntity } from '../../shared/infra/db/entities/legacy/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/legacy/event.entity'
import { LegacyTagEntity } from '../../shared/infra/db/entities/legacy/tag.entity'
import { UserEntity } from '../../shared/infra/db/entities/legacy/user.entity'
import { PlaceEntity } from '../../shared/infra/db/entities/places/place.entity'
import { WashroomEntity } from '../../shared/infra/db/entities/places/washroom.entity'
import { MikroClubRepo } from '../../modules/legacy/clubs/infra/repos/implementations/mikro-club-repo'
import { MikroEventRepo } from '../../modules/legacy/events/infra/repos/implementations/mikro-event-repo'
import { MikroUserRepo } from '../../modules/users/infra/repos/implementations/mikro-user-repo'
import { MikroPlaceRepo } from './../../modules/places/repos/mikro-place-repo'
import { MikroWashroomRepo } from '../../modules/resources/repos'
import { MikroReviewRepo } from '../../modules/reviews/repos/mikro-review-repo'
import { ReviewEntity } from '../../shared/infra/db/entities/review.entity'

class CustomNamingStrategy extends AbstractNamingStrategy implements NamingStrategy {
  classToTableName(entityName: string) {
    return this.underscore(this.normalize(entityName))
  }
  joinColumnName(propertyName: string) {
    return this.underscore(propertyName) + '_' + this.referenceColumnName()
  }
  joinKeyColumnName(entityName: string, referencedColumnName: string) {
    return (
      this.classToTableName(entityName) + '_' + (referencedColumnName || this.referenceColumnName())
    )
  }
  joinTableName(sourceEntity: string, _targetEntity: string, propertyName: string) {
    return this.classToTableName(sourceEntity) + '_' + this.classToTableName(propertyName)
  }
  propertyToColumnName(propertyName: string) {
    return this.underscore(propertyName)
  }
  referenceColumnName() {
    return 'id'
  }
  normalize(name: string) {
    return name.replace('Entity', '')
  }
  underscore(name: string) {
    return name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
  }
}

const clientUrl = process.env.DATABASE_URL
// Heroku's postgres service self-signs SSL certificates.
// In production, the dyno complains with Error: self signed certificate.
// This is probably the underlying PG driver complaining, so the temporary
// workaround is to allow unauthorized SSL certificates, per below.
// TODO: look into risk factors: https://stackoverflow.com/a/63914477/6113956
const sslOptions = { rejectUnauthorized: false }
const isDatabaseLocal = process.env.IS_DATABASE_LOCAL === 'true'
const isDatabaseSSL = isDatabaseLocal ? false : sslOptions

const baseOptions: Options = {
  // debug: process.env.NODE_ENV !== 'production',
  clientUrl,
  driver: PostgreSqlDriver,
  driverOptions: {
    connection: {
      ssl: isDatabaseSSL,
    },
  },
  debug: true,
  highlighter: new SqlHighlighter(),
  entities: ['**/*.entity.js'],
  entitiesTs: ['**/*.entity.ts'], // path to TS entities (source), relative to `baseDir`
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    disableForeignKeys: false,
    path: path.join(__dirname, '../../migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  namingStrategy: CustomNamingStrategy,
  type: 'postgresql',
}

async function setupMikroORM(options: Options = {}): Promise<MikroORM> {
  return await MikroORM.init({ ...baseOptions, ...options })
}

interface MikroEntityRepos {
  club: EntityRepository<ClubEntity>
  event: EntityRepository<EventEntity>
  tag: EntityRepository<LegacyTagEntity>
  user: EntityRepository<UserEntity>
  place: EntityRepository<PlaceEntity>
  review: EntityRepository<ReviewEntity>
  washroom: EntityRepository<WashroomEntity>
}
function setupMikroEntityRepos({ em: entityManager }: MikroORM): MikroEntityRepos {
  return {
    club: entityManager.getRepository(ClubEntity),
    event: entityManager.getRepository(EventEntity),
    tag: entityManager.getRepository(LegacyTagEntity),
    user: entityManager.getRepository(UserEntity),
    place: entityManager.getRepository(PlaceEntity),
    review: entityManager.getRepository(ReviewEntity),
    washroom: entityManager.getRepository(WashroomEntity),
  }
}

interface MikroRepos extends Repos {
  club: MikroClubRepo
  event: MikroEventRepo
  user: MikroUserRepo
  place: MikroPlaceRepo
  review: MikroReviewRepo
  washroom: MikroWashroomRepo
}

function setupMikroRepos(mikroEntityRepos: MikroEntityRepos): MikroRepos {
  return {
    club: new MikroClubRepo(mikroEntityRepos.club),
    event: new MikroEventRepo(mikroEntityRepos.event),
    user: new MikroUserRepo(mikroEntityRepos.user),
    place: new MikroPlaceRepo(mikroEntityRepos.place),
    review: new MikroReviewRepo(mikroEntityRepos.review, mikroEntityRepos.place),
    washroom: new MikroWashroomRepo(mikroEntityRepos.washroom),
  }
}

interface MikroDB extends DB {
  orm: MikroORM
  entityRepos: MikroEntityRepos
  repos: MikroRepos
}
async function setupMikroDB(options: Options = {}): Promise<MikroDB> {
  const orm = await setupMikroORM(options)
  const entityRepos = setupMikroEntityRepos(orm)
  const repos = setupMikroRepos(entityRepos)

  return {
    orm,
    entityRepos,
    repos,
  }
}

export { MikroORM, MikroEntityRepos, MikroRepos, MikroDB, setupMikroDB }
export default baseOptions // migrations CLI requires that these options be the default export
