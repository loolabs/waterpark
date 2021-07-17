import { dto } from '@loolabs/waterpark-common'
import { UserMap } from '../../../../modules/users/mappers/user-map'
import { mockUser } from './mock-user'

const mockUserDTO = (createUserDTO: dto.CreateUser): dto.User => {
  // TODO: make this independent of UserMap
  return UserMap.toDTO(mockUser(createUserDTO))
}

export { mockUserDTO }
