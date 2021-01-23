import { Club } from '../../../../domain/entities/club'
import { MikroClubRepo } from '../../../../infra/repos/implementations/mikro-club-repo'
import { GetAllClubsUseCase } from '../get-all-clubs-use-case'
import { createMockClubs } from '../test-utils/create-clubs'
import { ClubDTO } from '../../../../mappers/club-dto'
import { createMockClubDTOs } from '../test-utils/create-club-dtos'

jest.mock('../../../../infra/repos/implementations/mikro-club-repo')

describe('GetAllClubsUseCase', () => {
  let mockClubs: Array<Club>
  let mockClubDTOs: Array<ClubDTO>
  beforeAll(() => {
      mockClubs = createMockClubs()      
    mockClubDTOs = createMockClubDTOs()
  })
    
  test('When executed, should return all clubs and an Ok', async () => {
    jest.spyOn(MikroClubRepo.prototype, "getAllClubs").mockResolvedValue(mockClubs)
    const fakeMikroClubRepo = new MikroClubRepo()
    const getAllClubsUseCase = new GetAllClubsUseCase(fakeMikroClubRepo)

    const getAllClubsResult = await getAllClubsUseCase.execute()

    expect(fakeMikroClubRepo.getAllClubs).toBeCalled()
      expect(getAllClubsResult.isOk()).toBe(true)
      if (getAllClubsResult.isOk()) {
          expect(getAllClubsResult.value.length).toBe(3)
          for (const mockClubDTO of mockClubDTOs) {
              expect(getAllClubsResult.value).toContainEqual(mockClubDTO)
          }          
      }
  })

})
