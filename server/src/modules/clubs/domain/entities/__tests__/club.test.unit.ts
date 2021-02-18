import { DomainEvents } from '../../.././../../shared/domain/events/domain-events'
import { Result } from '../../../../../shared/core/result'
import { ClubCreated } from '../../events/club-created'
import { Club } from '../club'

jest.mock('../../events/club-created')
jest.mock('../../../../../shared/domain/events/domain-events')

let clubResult: Result<Club, Error>

describe('Club AggregateRoot', () => {
  beforeEach(() => {
    clubResult = Club.create({
      name: 'Club Name',
      description: 'Club Description',
    })
  })
  test('it adds a ClubCreated domain event on new Club creation', () => {
    if (clubResult.isErr()) throw new Error('Club result should be isOk, not isErr')
    expect(ClubCreated).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })
})
