import { UserRepo } from '../../modules/users/infra/repos/user-repo'
import { EventRepo } from '../../modules/legacy/events/infra/repos/event-repo'
import { ClubRepo } from '../../modules/legacy/clubs/infra/repos/club-repo'

export interface Repos {
  club: ClubRepo
  event: EventRepo
  user: UserRepo
}

export interface DB {
  repos: Repos
}
