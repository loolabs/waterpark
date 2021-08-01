import { UseCaseWithDTO } from '../../../../shared/app/use-case-with-dto';
import { AppError } from '../../../../shared/core/app-error';
import { Result } from '../../../../shared/core/result';
import { WashroomRepo } from '../../repos/washroom-repo';
import { WashroomDTO } from '../../mappers/washroom-dto';
import { WashroomMap } from '../../mappers/washroom-map';

type GetWashroomByIdUseCaseError = AppError.UnexpectedError;

export type DTO = {
  placeId: string;
};
type Response = Result<WashroomDTO, GetWashroomByIdUseCaseError>;

export class GetWashroomByIdUseCase implements UseCaseWithDTO<DTO, Response> {
  private washroomRepo: WashroomRepo;

  constructor(washroomRepo: WashroomRepo) {
    this.washroomRepo = washroomRepo;
  }

  async execute({ placeId }: DTO): Promise<Response> {
    const result = await this.washroomRepo.getWashroomByPlaceId(placeId, {
      mustIncludeReviews: true,
    });
    if (result.isOk()) {
      const washroomDTO: WashroomDTO = WashroomMap.toDTO(result.value);
      return Result.ok(washroomDTO);
    } else {
      return result;
    }
  }
}
