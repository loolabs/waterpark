import { Event } from '../../../domain/entities/event'
import { EventEntity } from '../../../../../shared/infra/db/entities/event.entity'
import { EventMap } from '../../../mappers/event-map'
import { EventRepo } from '../event-repo'
import { Result } from '../../../../../shared/core/result'
import { AppError } from '../../../../../shared/core/app-error'

export class MockEventRepo implements EventRepo {
  constructor(protected eventEntities: Array<EventEntity> = []) {}

  async getAllEvents(): Promise<Result<Array<Event>, AppError.UnexpectedError>> {
    return Result.ok(this.eventEntities.map(EventMap.toDomain))
  }
}
