import { UseCase } from '../../../../../shared/app/use-case'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { ClubRepo } from '../../../infra/repos/club-repo'
import { ClubDTO } from '../../../mappers/club-dto'
import { ClubMap } from '../../../mappers/club-map'
// import { GetAllClubsErrors } from './get-all-clubs-errors'

type GetAllClubsUseCaseError =AppError.UnexpectedError
//   | GetAllClubsErrors.NoClubsFoundError
//   | AppError.UnexpectedError

type GetAllClubsUseCaseResponse = Result<Array<ClubDTO>, GetAllClubsUseCaseError>

export class GetAllClubsUseCase
  implements UseCase<undefined, Promise<GetAllClubsUseCaseResponse>> {
  private clubRepo: ClubRepo

  constructor(clubRepo: ClubRepo) {
    this.clubRepo = clubRepo
  }

  async execute(): Promise<GetAllClubsUseCaseResponse> {    
    try {            
      const clubs = await this.clubRepo.getAllClubs();
      const clubDTOs: Array<ClubDTO> = clubs.map((club) => ClubMap.toDTO(club))
      return Result.ok(clubDTOs);
    } catch (err){
        return Result.err(new AppError.UnexpectedError(err));
    }
  }
}
