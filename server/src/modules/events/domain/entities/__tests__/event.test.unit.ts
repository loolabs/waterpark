import { DomainEvents } from '../../../../../shared/domain/events/domain-events'
import { Result } from '../../../../../shared/core/result'
import { EventCreated } from '../../events/event-created'
import { Event } from '../event'

jest.mock('../../events/event-created')
jest.mock('../../../../../shared/domain/events/domain-events')

let eventResult: Result<Event, Error>

describe('Event AggregateRoot', () => {
  beforeEach(() => {
    eventResult = Event.create({
      name: 'Event Name',
      description: 'Event Description',
      url: 'Event URL',
      bannerImage: 'Banner URL',
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
      links: {
        facebook: 'Facebook',
        twitter: 'Twitter',
        instagram: 'Instagram',
      },
      tags: ['tag1', 'tag2', 'tag3'],
      clubs: [{ name: 'Club Name 1', iconImage: '' }],
    })
  })

  test('it adds a EventCreated domain event on new Event creation', () => {
    if (eventResult.isErr()) throw new Error('Event result should be isOk, not isErr')
    expect(EventCreated).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })
})
