import { MockPlaceRepo } from '../../modules/places/repos/mock-place-repo'
import { Repos, DB } from './types'
import { MockClubRepo } from '../../modules/legacy/clubs/infra/repos/implementations/mock-club-repo'
import { MockEventRepo } from '../../modules/legacy/events/infra/repos/implementations/mock-event-repo'
import { MockUserRepo } from '../../modules/users/infra/repos/implementations/mock-user-repo'
import { ClubEntity } from '../../shared/infra/db/entities/legacy/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/legacy/event.entity'
import { UserEntity } from '../../shared/infra/db/entities/legacy/user.entity'
import { PlaceEntity } from '../../shared/infra/db/entities/places/place.entity'

interface MockEntities {
  clubs?: Array<ClubEntity>
  events?: Array<EventEntity>
  users?: Array<UserEntity>
  places?: Array<PlaceEntity>
}

interface MockRepos extends Repos {
  club: MockClubRepo
  event: MockEventRepo
  user: MockUserRepo
}

const setupMockRepos = (entities: MockEntities): MockRepos => {
  return {
    club: new MockClubRepo(entities.clubs),
    event: new MockEventRepo(entities.events),
    user: new MockUserRepo(entities.users),
    place: new MockPlaceRepo(entities.places),
  }
}

interface MockDB extends DB {
  repos: MockRepos
}

const setupMockDB = (entities: MockEntities): MockDB => {
  return {
    repos: setupMockRepos(entities),
  }
}

export { MockEntities, MockRepos, MockDB, setupMockDB }
