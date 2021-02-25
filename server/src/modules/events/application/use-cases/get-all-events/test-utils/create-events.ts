import { Event } from '../../../../domain/entities/event'
import { Result } from '../../../../../../shared/core/result'
import { AppError } from '../../../../../../shared/core/app-error'
export const createMockEvents = (): Result<Array<Event>, AppError.UnexpectedError> => {
  const events: Array<Event> = []
  for (let i = 1; i <= 3; ++i) {
    const eventResult = Event.create({
      name: `Event Name ${i}`,
      description: `Event Description ${i}`,
    })

    if (eventResult.isErr())
      return Result.err(new AppError.UnexpectedError('Something went wrong with Event creation'))
    events.push(eventResult.value)
  }

  return Result.ok(events)
}
