import { UseCaseWithoutDTO } from '../../../../shared/app/use-case-without-dto'
import { AppError } from '../../../../shared/core/app-error'
import { Result } from '../../../../shared/core/result'
import { WashroomRepo } from '../../repos/washroom-repo'
import { WashroomDTO } from '../../mappers/washroom-dto'
import { WashroomMap } from '../../mappers/washroom-map'

type GetAllWashroomsUseCaseError = AppError.UnexpectedError

type GetAllWashroomsUseCaseResponse = Result<Array<WashroomDTO>, GetAllWashroomsUseCaseError>

export class GetAllWashroomsUseCase
  implements UseCaseWithoutDTO<Promise<GetAllWashroomsUseCaseResponse>>
{
  private washroomRepo: WashroomRepo

  constructor(washroomRepo: WashroomRepo) {
    this.washroomRepo = washroomRepo
  }

  async execute(): Promise<GetAllWashroomsUseCaseResponse> {
    const result = await this.washroomRepo.getAllWashrooms()
    if (result.isOk()) {
      const washroomDTOs: Array<WashroomDTO> = result.value.map((washroom) =>
        WashroomMap.toDTO(washroom)
      )
      return Result.ok(washroomDTOs)
    } else {
      return result
    }
  }
}
