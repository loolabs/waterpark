import { Club } from '../../domain/entities/club'

export abstract class ClubRepo {
  abstract exists(name: string): Promise<boolean>
  abstract getClubByClubId(clubId: string): Promise<Club>
  abstract getAllClubs(): Promise<Club[]>
  // abstract save(club: Club): Promise<void>
}
