import { Event } from '../../domain/entities/event'
import { Result } from '../../../../shared/core/result'
import { AppError } from '../../../../shared/core/app-error'

export abstract class EventRepo {
  abstract getAllEvents(): Promise<Result<Array<Event>, AppError.UnexpectedError>>
}
