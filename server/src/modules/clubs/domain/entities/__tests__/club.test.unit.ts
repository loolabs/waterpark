import { DomainEvents } from '../../.././../../shared/domain/events/domain-events'
import { Result } from '../../../../../shared/core/result'
import { ClubCreated } from '../../events/club-created'
import { ClubDeleted } from '../../events/club-deleted'
import { Club } from '../club';

jest.mock('../../events/club-created');
jest.mock('../../events/club-deleted');
jest.mock('../../../../../shared/domain/events/domain-events');

let clubResult: Result<Club, Error>;

describe('Club AggregateRoot', () => {
    beforeEach(() => {
        clubResult = Club.create({
            name: "Club Name",
            description: "Club Description"
        });
    })
    test('it adds a ClubCreated domain event on new Club creation', () => {
        if (clubResult.isErr()) throw new Error('Club result should be isOk, not isErr')
        expect(ClubCreated).toBeCalled()
        expect(DomainEvents.markAggregateForDispatch).toBeCalled()
    })

    test("it adds a ClubDeleted domain event on club deletion", () => {
        if (clubResult.isErr()) throw new Error('Club result should be isOk, not isErr')
        clubResult.value.delete()
        expect(ClubDeleted).toBeCalled()
        expect(DomainEvents.markAggregateForDispatch).toBeCalled()
    })
})