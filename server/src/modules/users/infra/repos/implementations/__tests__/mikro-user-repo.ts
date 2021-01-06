// import { MikroORM } from '@mikro-orm/core'
// import { UserEntity } from '../../../../../../shared/infra/database/entities/user.entity'
// import { createMockUser } from '../../../../application/use-cases/create-user/test-utils/create-user'
// import { UserRepo } from '../../user-repo'
// import { MikroUserRepo } from '../mikro-user-repo'

// describe('MikroUserRepo', () => {
//   let mikroUserRepo: UserRepo

//   beforeAll(async () => {
//     const orm = await MikroORM.init()
//     const em = orm.em
//     const userEntityRepository = em.getRepository(UserEntity)
//     mikroUserRepo = new MikroUserRepo(userEntityRepository)
//   })

//   test('it reports if a user exists when .exists() is called', async () => {
//     const user = createMockUser()
//     await mikroUserRepo.save(user)

//     expect(mikroUserRepo.exists(user.email)).toBe(true)
//   })

//   test('it returns the correct user when .getUserByUserId() is called', () => {})

//   test('it saves user when .save() is called')
// })
