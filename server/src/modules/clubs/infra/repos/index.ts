import { DB } from '../../../../shared/infra/db'
import { MikroClubRepo } from './implementations/mikro-club-repo'

const mikroClubRepo = new MikroClubRepo(DB.clubsEntityRepo)

export { mikroClubRepo }
