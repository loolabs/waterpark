import { UseCaseWithoutDTO } from '../../../../../shared/app/use-case-without-dto'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { EventRepo } from '../../../infra/repos/event-repo'
import { EventDTO } from '../../../mappers/event-dto'
import { EventMap } from '../../../mappers/event-map'

type GetAllEventsUseCaseError = AppError.UnexpectedError

type GetAllEventsUseCaseResponse = Result<Array<EventDTO>, GetAllEventsUseCaseError>

export class GetAllEventsUseCase
  implements UseCaseWithoutDTO<Promise<GetAllEventsUseCaseResponse>> {
  private eventRepo: EventRepo

  constructor(eventRepo: EventRepo) {
    this.eventRepo = eventRepo
  }

  async execute(): Promise<GetAllEventsUseCaseResponse> {
    const result = await this.eventRepo.getAllEvents()
    if (result.isOk()) {
      const eventDTOs: Array<EventDTO> = result.value.map((event) => EventMap.toDTO(event))
      return Result.ok(eventDTOs)
    } else {
      return result
    }
  }
}
