import { mocks } from '../../../../../../test-utils'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { Event } from '../../../../domain/entities/event'
import { EventDTO } from '../../../../mappers/event-dto'

jest.mock('../../../../infra/repos/implementations/mock-event-repo')

describe('GetAllEventsUseCase', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockEvents: Array<Event> = ids.map(mocks.mockEvent)
  const mockEventDTOs: Array<EventDTO> = ids.map(mocks.mockEventDTO)
  const { eventRepo, getAllEventsUseCase } = mocks.mockGetAllEvents()

  test('When executed, should return all events and an Ok', async () => {
    jest.spyOn(eventRepo, 'getAllEvents').mockResolvedValue(Result.ok(mockEvents))

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
      .spyOn(eventRepo, 'getAllEvents')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const getAllEventsResult = await getAllEventsUseCase.execute()

    expect(eventRepo.getAllEvents).toBeCalled()
    expect(getAllEventsResult.isErr()).toBe(true)
  })
})
