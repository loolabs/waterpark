import { Club } from '../../../../domain/entities/club'
import { Result } from '../../../../../../shared/core/result'
import { AppError } from '../../../../../../shared/core/app-error'
export const createMockClubs = (): Result<Array<Club>, AppError.UnexpectedError> => {
  const clubs: Array<Club> = []
  for (let i = 1; i <= 3; ++i) {
    const clubResult = Club.create({
      name: `Club Name ${i}`,
      description: `Club Description ${i}`,
      backgroundImageURL: `Club Background ${i}`,
      iconURL: `Club Icon ${i}`,
      facebookLink: `Facebook ${i}`,
      twitterLink: `Twitter ${i}`,
      instagramLink: `Instagram ${i}`,
      websiteLink: `Website ${i}`,
      tags: ['tag1', 'tag2', 'tag3'],
      events: [
        {
          name: 'Event Name 1',
          startTime: new Date('2021-01-01'),
          endTime: new Date('2021-01-01'),
          backgroundImageURL: 'Event Background',
          tags: ['tags'],
        },
      ],
    })

    if (clubResult.isErr())
      return Result.err(new AppError.UnexpectedError('Something went wrong with Club creation'))
    clubs.push(clubResult.value)
  }

  return Result.ok(clubs)
}
