import { UserRepo } from '../../modules/users/infra/repos/user-repo'
import { EventRepo } from '../../modules/legacy/events/infra/repos/event-repo'
import { ClubRepo } from '../../modules/legacy/clubs/infra/repos/club-repo'
import { PlaceRepo } from '../../modules/places/repos/place-repo'
import { WashroomRepo } from '../../modules/washrooms/repos/washroom-repo'

export interface Repos {
  club: ClubRepo
  event: EventRepo
  user: UserRepo
  place: PlaceRepo
  washroom: WashroomRepo
}

export interface DB {
  repos: Repos
}
