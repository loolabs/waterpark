import { UseCase } from '../../../../../shared/app/use-case'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { Club } from '../../../domain/entities/club'
import { ClubValueObjectErrors } from '../../../domain/value-objects/errors'
import { ClubEmail } from '../../../domain/value-objects/club-email'
import { ClubPassword } from '../../../domain/value-objects/club-password'
import { ClubRepo } from '../../../infra/repos/club-repo'
import { GetAllClubsDTO } from './get-all-clubs-dto'
import { GetAllClubsErrors } from './get-all-clubs-errors'

type GetAllClubsUseCaseError =
  | ClubValueObjectErrors.InvalidEmail // TODO define error types
  | ClubValueObjectErrors.InvalidPassword
  | GetAllClubsErrors.EmailAlreadyExistsError
  | GetAllClubsErrors.NameAlreadyExistsError
  | AppError.UnexpectedError

type GetAllClubsUseCaseResponse = Result<Club[], GetAllClubsUseCaseError>

export class GetAllClubsUseCase
  implements UseCase<GetAllClubsDTO, Promise<GetAllClubsUseCaseResponse>> {
  private clubRepo: ClubRepo

  constructor(clubRepo: ClubRepo) {
    this.clubRepo = clubRepo
  }

    async execute(request: GetAllClubsDTO): Promise<GetAllClubsUseCaseResponse> {
        try {            
            const clubs = await this.clubRepo.getAllClubs();
            return Result.ok(clubs);
        } catch (err){
            return Result.err(new AppError.UnexpectedError(err));
        }
    // const emailResult = ClubEmail.create(request.email)
    // const passwordResult = ClubPassword.create({
    //   value: request.password,
    //   hashed: false,
    // })

    // const results = [emailResult, passwordResult] as const
    // if (!Result.resultsAllOk(results)) {
    //   return Result.err(Result.getFirstError([emailResult, passwordResult]).error)
    // }

    // const email = results[0].value
    // const password = results[1].value

    // try {
    //   const clubAlreadyExists = await this.clubRepo.exists(email)
    //   if (clubAlreadyExists)
    //     return Result.err(new CreateClubErrors.EmailAlreadyExistsError(email.value))

    //   const clubResult = Club.create({
    //     email,
    //     password,
    //   })
    //   if (clubResult.isErr()) return clubResult

    //   const club = clubResult.value
    //   await this.clubRepo.save(club)

    //   return Result.ok(club)
    // } catch (err) {
    //   return Result.err(new AppError.UnexpectedError(err))
    // }
  }
}
