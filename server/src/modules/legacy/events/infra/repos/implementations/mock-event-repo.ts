import { Event } from '../../../domain/entities/event'
import { EventRepo } from '../event-repo'
import { Result } from '../../../../../../shared/core/result'
import { AppError } from '../../../../../../shared/core/app-error'

export class MockEventRepo implements EventRepo {
  constructor(protected events: Array<Event> = []) {}

  async getAllEvents(): Promise<Result<Array<Event>, AppError.UnexpectedError>> {
    return Result.ok(this.events)
  }
}
