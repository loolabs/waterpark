import { UseCaseWithoutDTO } from '../../../../../shared/app/use-case-without-dto'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { PlaceRepo } from '../../../infra/repos/place-repo';
import { PlaceDTO } from '../../../mappers/place-dto'
import { PlaceMap } from '../../../mappers/place-map';

type GetAllPlacesUseCaseError = AppError.UnexpectedError

type GetAllPlacesUseCaseResponse = Result<Array<PlaceDTO>, GetAllPlacesUseCaseError>

export class GetAllPlacesUseCase
  implements UseCaseWithoutDTO<Promise<GetAllPlacesUseCaseResponse>> {
  private placeRepo: PlaceRepo

  constructor(placeRepo: PlaceRepo) {
    this.placeRepo = placeRepo
  }

  async execute(): Promise<GetAllPlacesUseCaseResponse> {
    const result = await this.placeRepo.getAllPlaces()
    if (result.isOk()) {
      const placeDTOs: Array<PlaceDTO> = result.value.map((place) => PlaceMap.toDTO(place))
      return Result.ok(placeDTOs)
    } else {
      return result
    }
  }
}
