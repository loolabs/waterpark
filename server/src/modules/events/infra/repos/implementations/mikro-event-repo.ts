import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { Event } from '../../../domain/entities/event'
import { EventEntity } from '../../../../../shared/infra/db/entities/event.entity'
import { EventMap } from '../../../mappers/event-map'
import { EventRepo } from '../event-repo'
import { Result } from '../../../../../shared/core/result'
import { AppError } from '../../../../../shared/core/app-error'

export class MikroEventRepo implements EventRepo {
  constructor(protected eventsEntityRepo: EntityRepository<EventEntity>) {}

  async getAllEvents(): Promise<Result<Array<Event>, AppError.UnexpectedError>> {
    try {
      const eventEntities: Array<EventEntity> = await this.eventsEntityRepo.find(
        {},
        { orderBy: { name: QueryOrder.DESC_NULLS_LAST } }
      )
      const events = eventEntities.map(
        (eventEntity: EventEntity): Event => EventMap.toDomain(eventEntity)
      )
      return Result.ok(events)
    } catch (err) {
      return Result.err(new AppError.UnexpectedError(err))
    }
  }
}
