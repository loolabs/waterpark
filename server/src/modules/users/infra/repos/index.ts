import { DB } from '../../../../shared/infra/db'
import { MikroUserRepo } from './implementations/mikro-user-repo'

const mikroUserRepo = new MikroUserRepo(DB.usersEntityRepo)

export { mikroUserRepo }
