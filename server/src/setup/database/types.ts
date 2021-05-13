import { UserRepo } from '../../modules/users/infra/repos/user-repo'
import { EventRepo } from '../../modules/events/infra/repos/event-repo'
import { ClubRepo } from '../../modules/clubs/infra/repos/club-repo'

export interface Repos {
  club: ClubRepo
  event: EventRepo
  user: UserRepo
}

export interface DB {
  repos: Repos
}
