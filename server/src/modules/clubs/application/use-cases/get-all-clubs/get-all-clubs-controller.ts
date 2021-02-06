import express from 'express'
import { BaseController } from '../../../../../shared/app/base-controller'
import { ClubRepo } from '../../../infra/repos/club-repo'
import { ClubDTO } from '../../../mappers/club-dto'
import { ClubMap } from '../../../mappers/club-map'

export class GetAllClubsController extends BaseController {
  constructor(private clubRepo: ClubRepo) {
    super()
  }

  async execute(_req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const clubs = await this.clubRepo.getAllClubs()
      const clubDTOs: Array<ClubDTO> = clubs.map((club) => ClubMap.toDTO(club))
      return this.ok(res, clubDTOs)
    } catch (err) {
      return this.fail(res, err)
    }
  }
}
