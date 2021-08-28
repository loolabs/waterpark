import { UserRepo } from '../../modules/users/infra/repos/user-repo'
import { EventRepo } from '../../modules/legacy/events/infra/repos/event-repo'
import { ClubRepo } from '../../modules/legacy/clubs/infra/repos/club-repo'
import { PlaceRepo } from '../../modules/places/repos/place-repo'
import { ReviewRepo } from '../../modules/reviews/repos/review-repo'
import { ResourceRepo } from '../../modules/resources/repos/resource-repo'
import { Washroom } from '../../modules/resources/domain/entities/washroom'

export interface Repos {
  club: ClubRepo
  event: EventRepo
  user: UserRepo
  place: PlaceRepo
  review: ReviewRepo
  washroom: ResourceRepo<Washroom>
}

export interface DB {
  repos: Repos
}
