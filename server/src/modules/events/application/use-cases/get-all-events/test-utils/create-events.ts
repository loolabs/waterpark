import { Event } from '../../../../domain/entities/event'
import { Result } from '../../../../../../shared/core/result'
import { AppError } from '../../../../../../shared/core/app-error'
export const createMockEvents = (): Result<Array<Event>, AppError.UnexpectedError> => {
  const events: Array<Event> = []
  for (let i = 1; i <= 3; ++i) {
    const eventResult = Event.create({
      name: `Event Name ${i}`,
      description: `Event Description ${i}`,
      url: `Event URL ${i}`,
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
      facebookLink: `Facebook ${i}`,
      twitterLink: `Twitter ${i}`,
      instagramLink: `Instagram ${i}`,
      websiteLink: `Website ${i}`,
      bannerURL: `Banner URL ${i}`,
      tags: ['tag1', 'tag2', 'tag3'],
      clubs: [{ name: 'Club Name 1', iconURL: '' }],
    })

    if (eventResult.isErr())
      return Result.err(new AppError.UnexpectedError('Something went wrong with Event creation'))
    events.push(eventResult.value)
  }

  return Result.ok(events)
}
