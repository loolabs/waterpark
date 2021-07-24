import { DomainEvents } from '../../../../../shared/domain/events/domain-events'
import { Result } from '../../../../../shared/core/result'
import { PlaceCreated } from '../../events/place-created'
import { Place } from '../place'

jest.mock('../../events/place-created')
jest.mock('../../../../../shared/domain/events/domain-events')

let eventResult: Result<Place, Error>

describe('Place AggregateRoot', () => {
  beforeEach(() => {
    eventResult = Place.create({
      name: 'Place Name',
      description: 'Place Description',
      address: 'Place Address',
      onCampus: true,
      links: {
        url: 'Place URL',
        bannerImage: 'Banner URL',
        iconImage: 'Icon URL'
      },
      tags: ['tag1', 'tag2', 'tag3'],
    })
  })

  test('it adds a PlaceCreated domain event on new Place creation', () => {
    if (eventResult.isErr()) throw new Error('Place result should be isOk, not isErr')
    expect(PlaceCreated).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })
})
