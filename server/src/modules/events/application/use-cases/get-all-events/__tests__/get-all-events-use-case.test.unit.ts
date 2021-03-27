import { Event } from '../../../../domain/entities/event'
import { MikroEventRepo } from '../../../../infra/repos/implementations/mikro-event-repo'
import { GetAllEventsUseCase } from '../get-all-events-use-case'
import { createMockEvents } from '../test-utils/create-events'
import { createMockEventDTOs } from '../test-utils/create-event-dtos'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { EventDTO } from '../../../../mappers/event-dto'

jest.mock('../../../../infra/repos/implementations/mikro-event-repo')

describe('GetAllEventsUseCase', () => {
  let mockEvents: Result<Array<Event>, AppError.UnexpectedError>
  let mockEventDTOs: Array<EventDTO>
  beforeAll(() => {
    mockEvents = createMockEvents()
    mockEventDTOs = createMockEventDTOs()
  })

  test('When executed, should return all events and an Ok', async () => {
    jest.spyOn(MikroEventRepo.prototype, 'getAllEvents').mockResolvedValue(mockEvents)
    const fakeMikroEventRepo = new MikroEventRepo()
    const getAllEventsUseCase = new GetAllEventsUseCase(fakeMikroEventRepo)

    const getAllEventsResult = await getAllEventsUseCase.execute()

    expect(fakeMikroEventRepo.getAllEvents).toBeCalled()
    expect(getAllEventsResult.isOk()).toBe(true)
    if (getAllEventsResult.isOk()) {
      expect(getAllEventsResult.value.length).toBe(3)
      for (const mockEventDTO of mockEventDTOs) {
        expect(getAllEventsResult.value).toContainEqual(mockEventDTO)
      }
    }
  })

  test('When repo throws error, should return AppError.UnexpectedError', async () => {
    jest
      .spyOn(MikroEventRepo.prototype, 'getAllEvents')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))
    const fakeMikroEventRepo = new MikroEventRepo()
    const getAllEventsUseCase = new GetAllEventsUseCase(fakeMikroEventRepo)

    const getAllEventsResult = await getAllEventsUseCase.execute()
    expect(fakeMikroEventRepo.getAllEvents).toBeCalled()
    expect(getAllEventsResult.isErr()).toBe(true)
  })
})
