import { UseCaseWithoutDTO } from '../../../../../shared/app/use-case-without-dto'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { ClubRepo } from '../../../infra/repos/club-repo'
import { ClubMap } from '../../../mappers/club-map'
import { dto } from '@loolabs/waterpark-common'

type GetAllClubsUseCaseError = AppError.UnexpectedError

type GetAllClubsUseCaseResponse = Result<Array<dto.Club>, GetAllClubsUseCaseError>

export class GetAllClubsUseCase implements UseCaseWithoutDTO<Promise<GetAllClubsUseCaseResponse>> {
  private clubRepo: ClubRepo

  constructor(clubRepo: ClubRepo) {
    this.clubRepo = clubRepo
  }

  async execute(): Promise<GetAllClubsUseCaseResponse> {
    const result = await this.clubRepo.getAllClubs()
    if (result.isOk()) {
      const clubDTOs: Array<dto.Club> = result.value.map((club) => ClubMap.toDTO(club))
      return Result.ok(clubDTOs)
    } else {
      return result
    }
  }
}
