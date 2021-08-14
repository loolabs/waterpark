import { DomainEvents } from '../../../../../shared/domain/events/domain-events'
import { Result } from '../../../../../shared/core/result'
import { WashroomCreated } from '../../events/washroom-created'
import { Washroom } from '../washroom'

jest.mock('../../events/washroom-created')
jest.mock('../../../../../shared/domain/events/domain-events')

let washroomResult: Result<Washroom, Error>

describe('Washroom AggregateRoot', () => {
  beforeEach(() => {
    washroomResult = Washroom.create({
      name: 'Washroom Name',
      description: 'Washroom Description',
      address: 'Washroom Address',
      onCampus: true,
      links: {
        url: 'Washroom URL',
        bannerImage: 'Banner URL',
        iconImage: 'Icon URL',
      },
      tags: ['tag1', 'tag2', 'tag3'],
    })
  })

  test('it adds a WashroomCreated domain event on new Washroom creation', () => {
    if (washroomResult.isErr()) throw new Error('Washroom result should be isOk, not isErr')
    expect(WashroomCreated).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })
})
