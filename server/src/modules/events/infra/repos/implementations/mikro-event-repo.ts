import { QueryOrder } from '@mikro-orm/core'
import { DB } from '../../../../../shared/infra/db'
import { EventEntity } from '../../../../../shared/infra/db/entities/event.entity'
import { Event } from '../../../domain/entities/event'
import { EventMap } from '../../../mappers/event-map'
import { EventRepo } from '../event-repo'
import { Result } from '../../../../../shared/core/result'
import { AppError } from '../../../../../shared/core/app-error'

export class MikroEventRepo implements EventRepo {
  async getAllEvents(): Promise<Result<Array<Event>, AppError.UnexpectedError>> {
    try {
      const eventEntities: Array<EventEntity> = await DB.eventsEntityRepo.find(
        {},
        {
          populate: ['tags', 'clubs'],
          orderBy: { startTime: QueryOrder.ASC_NULLS_LAST },
        }
      )
      const events = await Promise.all(eventEntities.map(EventMap.toDomain))
      return Result.ok(events)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
