import { Repos, DB } from './types'
import { MockClubRepo } from '../../modules/legacy/clubs/infra/repos/implementations/mock-club-repo'
import { MockEventRepo } from '../../modules/legacy/events/infra/repos/implementations/mock-event-repo'
import { MockUserRepo } from '../../modules/users/infra/repos/implementations/mock-user-repo'
import { MockPlaceRepo } from './../../modules/places/repos/mock-place-repo'
import { MockReviewRepo } from '../../modules/reviews/repos/mock-review-repo'
import { MockWashroomRepo } from '../../modules/resources/repos'
import { ClubEntity } from '../../shared/infra/db/entities/legacy/club.entity'
import { EventEntity } from '../../shared/infra/db/entities/legacy/event.entity'
import { User } from '../../modules/users/domain/entities/user'
import { Place } from '../../modules/places/domain/entities/place'
import { Review } from '../../modules/reviews/domain/entities/review'
import { WashroomEntity } from '../../shared/infra/db/entities/places/washroom.entity'

interface MockEntities {
  clubs?: Array<ClubEntity>
  events?: Array<EventEntity>
  users?: Array<User>
  places?: Array<Place>
  reviews?: Array<Review> // TODO: turn the others into domain entities too
  washrooms?: Array<WashroomEntity>
}

interface MockRepos extends Repos {
  club: MockClubRepo
  event: MockEventRepo
  user: MockUserRepo
  place: MockPlaceRepo
  review: MockReviewRepo
  washroom: MockWashroomRepo
}

const setupMockRepos = (entities: MockEntities): MockRepos => {
  return {
    club: new MockClubRepo(entities.clubs),
    event: new MockEventRepo(entities.events),
    user: new MockUserRepo(entities.users),
    place: new MockPlaceRepo(entities.places),
    review: new MockReviewRepo(entities.reviews),
    washroom: new MockWashroomRepo(entities.washrooms),
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
