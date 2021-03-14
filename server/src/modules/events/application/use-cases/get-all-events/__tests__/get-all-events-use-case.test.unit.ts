import { Event } from '../../../../domain/entities/event'
import { createMockEvent } from '../test-utils/create-mock-event'
import { createMockEventDTO } from '../test-utils/create-mock-event-dto'
import { EventDTO } from '../../../../mappers/event-dto'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { setup } from '../test-utils/setup'
import { MockEventRepo } from '../../../../infra/repos/implementations/mock-event-repo'

jest.mock('../../../../infra/repos/implementations/mock-event-repo')

describe('GetAllEventsUseCase', () => {
  const ids = [1, 2, 3]
  const mockEvents: Array<Event> = ids.map(createMockEvent)
  const mockEventDTOs: Array<EventDTO> = ids.map(createMockEventDTO)

  test('When executed, should return all events and an Ok', async () => {
    jest.spyOn(MockEventRepo.prototype, 'getAllEvents').mockResolvedValue(Result.ok(mockEvents))
    const { eventRepo, getAllEventsUseCase } = setup()

    const getAllEventsResult = await getAllEventsUseCase.execute()

    expect(eventRepo.getAllEvents).toBeCalled()
    expect(getAllEventsResult.isOk()).toBe(true)
    if (getAllEventsResult.isOk()) {
      expect(getAllEventsResult.value.length).toBe(ids.length)
      for (const mockEventDTO of mockEventDTOs) {
        expect(getAllEventsResult.value).toContainEqual(mockEventDTO)
      }
    }
  })

  test('When repo throws error, should return AppError.UnexpectedError', async () => {
    jest
      .spyOn(MockEventRepo.prototype, 'getAllEvents')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))
    const { eventRepo, getAllEventsUseCase } = setup()

    const getAllEventsResult = await getAllEventsUseCase.execute()
    expect(eventRepo.getAllEvents).toBeCalled()
    expect(getAllEventsResult.isErr()).toBe(true)
  })
})
