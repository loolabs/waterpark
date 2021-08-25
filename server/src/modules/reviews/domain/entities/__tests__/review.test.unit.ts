import { DomainEvents } from '../../../../../shared/domain/events/domain-events'
import { ReviewCreated } from '../../events/review-created'
import { mocks } from '../../../../../test-utils'

jest.mock('../../events/review-created')
jest.mock('../../../../../shared/domain/events/domain-events')

describe('Review AggregateRoot', () => {
  test('it adds a ReviewCreated domain event on new Review creation', () => {
    mocks.mockReview('1', '1')
    expect(ReviewCreated).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })
})
