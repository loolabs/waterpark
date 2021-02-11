import { DomainEvents } from '../../../../../shared/domain/events/domain-events'
import { UserCreated } from '../../events/user-created'
import { UserDeleted } from '../../events/user-deleted'
import { UserLoggedIn } from '../../events/user-logged-in'
import { UserEmail } from '../../value-objects/user-email'
import { UserPassword } from '../../value-objects/user-password'
import { User } from '../user'

jest.mock('../../events/user-created')
jest.mock('../../events/user-deleted')
jest.mock('../../events/user-logged-in')
jest.mock('../../../../../shared/domain/events/domain-events')

describe('User AggregateRoot', () => {
  test('it adds a UserCreated domain event on new User creation', () => {
    const emailResult = UserEmail.create('john.doe@uwaterloo.ca')
    const passwordResult = UserPassword.create({ value: 'secretpassword', hashed: false })

    if (emailResult.isErr() || passwordResult.isErr())
      throw new Error('Result should be isOk, not isErr')

    User.create({
      email: emailResult.value,
      password: passwordResult.value,
    })

    // note: not sure if this is the best way to test AggregateRoot.addDomainEvent() was called with UserCreated event
    // TODO: if changes made here, see clubs/domain/entities/__tests__/club.test.unit.ts as well.
    expect(UserCreated).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })

  test('it adds a UserLoggedIn domain event on user login', () => {
    const emailResult = UserEmail.create('john.doe@uwaterloo.ca')
    const passwordResult = UserPassword.create({ value: 'secretpassword', hashed: false })

    if (emailResult.isErr() || passwordResult.isErr())
      throw new Error('Result should be isOk, not isErr')

    const userResult = User.create({
      email: emailResult.value,
      password: passwordResult.value,
    })

    if (userResult.isErr()) throw new Error('User result should be isOk, not isErr')

    const user = userResult.value
    user.setAccessToken('token', 'refresh')

    // note: not sure if this is the best way to test AggregateRoot.addDomainEvent() was called with UserLoggedIn event
    // TODO: if changes made here, see clubs/domain/entities/__tests__/club.test.unit.ts as well.
    expect(UserLoggedIn).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })

  test('it adds a UserDeleted domain event on user deletion', () => {
    const emailResult = UserEmail.create('john.doe@uwaterloo.ca')
    const passwordResult = UserPassword.create({ value: 'secretpassword', hashed: false })

    if (emailResult.isErr() || passwordResult.isErr())
      throw new Error('Result should be isOk, not isErr')

    const userResult = User.create({
      email: emailResult.value,
      password: passwordResult.value,
    })

    if (userResult.isErr()) throw new Error('User result should be isOk, not isErr')

    const user = userResult.value
    user.delete()

    // note: not sure if this is the best way to test AggregateRoot.addDomainEvent() was called with UserLoggedIn event
    // TODO: if changes made here, see clubs/domain/entities/__tests__/club.test.unit.ts as well.
    expect(UserDeleted).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })
})
