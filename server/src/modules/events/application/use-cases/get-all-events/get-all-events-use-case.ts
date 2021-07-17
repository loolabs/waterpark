import { UseCaseWithoutDTO } from '../../../../../shared/app/use-case-without-dto'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { EventRepo } from '../../../infra/repos/event-repo'
import { EventMap } from '../../../mappers/event-map'
import { dto } from '@loolabs/waterpark-common'

type GetAllEventsUseCaseError = AppError.UnexpectedError

type GetAllEventsUseCaseResponse = Result<Array<dto.Event>, GetAllEventsUseCaseError>

export class GetAllEventsUseCase
  implements UseCaseWithoutDTO<Promise<GetAllEventsUseCaseResponse>>
{
  private eventRepo: EventRepo

  constructor(eventRepo: EventRepo) {
    this.eventRepo = eventRepo
  }

  async execute(): Promise<GetAllEventsUseCaseResponse> {
    const result = await this.eventRepo.getAllEvents()
    if (result.isOk()) {
      const eventDTOs: Array<dto.Event> = result.value.map((event) => EventMap.toDTO(event))
      return Result.ok(eventDTOs)
    } else {
      return result
    }
  }
}
