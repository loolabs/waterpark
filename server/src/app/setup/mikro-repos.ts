import * as types from '../types'
import { MikroClubRepo } from '../../modules/clubs/infra/repos/implementations/mikro-club-repo'
import { MikroEventRepo } from '../../modules/events/infra/repos/implementations/mikro-event-repo'
import { MikroUserRepo } from '../../modules/users/infra/repos/implementations/mikro-user-repo'

export const MikroRepos = (mikroEntityRepos: types.MikroEntityRepos): types.Repos => {
  return {
    club: new MikroClubRepo(mikroEntityRepos.club),
    event: new MikroEventRepo(mikroEntityRepos.event),
    user: new MikroUserRepo(mikroEntityRepos.user),
  }
}
