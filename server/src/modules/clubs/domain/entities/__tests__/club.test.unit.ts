import { DomainEvents } from '../../.././../../shared/domain/events/domain-events'
import { UniqueEntityID } from '../../../../../shared/domain/unique-entity-id'
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
      size: 30,
      links: {
        bannerImage: 'Banner URL',
        iconImage: 'Icon',
        facebook: 'Facebook',
        twitter: 'Twitter',
        instagram: 'Instagram',
        website: 'Website',
      },
      tags: ['tag1', 'tag2', 'tag3'],
      events: [
        {
          id: new UniqueEntityID(),
          name: 'Club Name 1',
          startTime: new Date('2021-01-01'),
          endTime: new Date('2021-01-01'),
          bannerImage: '',
          tags: ['clubtag1', 'clubtag2'],
        },
      ],
    })
  })
  test('it adds a ClubCreated domain event on new Club creation', () => {
    if (clubResult.isErr()) throw new Error('Club result should be isOk, not isErr')
    expect(ClubCreated).toBeCalled()
    expect(DomainEvents.markAggregateForDispatch).toBeCalled()
  })
})
