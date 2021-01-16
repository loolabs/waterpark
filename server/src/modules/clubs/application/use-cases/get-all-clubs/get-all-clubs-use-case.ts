import { UseCase } from '../../../../../shared/app/use-case'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { Club } from '../../../domain/entities/club'
import { ClubRepo } from '../../../infra/repos/club-repo'
// import { GetAllClubsErrors } from './get-all-clubs-errors'

type GetAllClubsUseCaseError =AppError.UnexpectedError
//   | GetAllClubsErrors.NoClubsFoundError
//   | AppError.UnexpectedError

type GetAllClubsUseCaseResponse = Result<Club[], GetAllClubsUseCaseError>

export class GetAllClubsUseCase
  implements UseCase<undefined, Promise<GetAllClubsUseCaseResponse>> {
  private clubRepo: ClubRepo

  constructor(clubRepo: ClubRepo) {
    this.clubRepo = clubRepo
  }

  async execute(): Promise<GetAllClubsUseCaseResponse> {    
    try {            
        const clubs = await this.clubRepo.getAllClubs();
        // if (clubs === undefined || clubs.length === 0) {
        //     return Result.err(new GetAllClubsErrors.NoClubsFoundError())
        // }
        return Result.ok(clubs);
    } catch (err){
        return Result.err(new AppError.UnexpectedError(err));
    }
  }
}
