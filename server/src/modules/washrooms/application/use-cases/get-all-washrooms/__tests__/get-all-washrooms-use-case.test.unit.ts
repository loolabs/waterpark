import { mocks } from '../../../../../../test-utils'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { Washroom } from '../../../../domain/entities/washroom'
import { WashroomDTO } from '../../../../mappers/place-dto'

jest.mock('../../../../infra/repos/implementations/mock-place-repo')

describe('GetAllWashroomsUseCase', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockWashrooms: Array<Washroom> = ids.map(mocks.mockWashroom)
  const mockWashroomDTOs: Array<WashroomDTO> = ids.map(mocks.mockWashroomDTO)
  const { placeRepo, getAllWashroomsUseCase } = mocks.mockGetAllWashrooms()

  test('When executed, should return all places and an Ok', async () => {
    jest.spyOn(placeRepo, 'getAllWashrooms').mockResolvedValue(Result.ok(mockWashrooms))

    const getAllWashroomsResult = await getAllWashroomsUseCase.execute()

    expect(placeRepo.getAllWashrooms).toBeCalled()
    expect(getAllWashroomsResult.isOk()).toBe(true)
    if (getAllWashroomsResult.isOk()) {
      expect(getAllWashroomsResult.value.length).toBe(ids.length)
      for (const mockWashroomDTO of mockWashroomDTOs) {
        expect(getAllWashroomsResult.value).toContainEqual(mockWashroomDTO)
      }
    }
  })

  test('When repo throws error, should return AppError.UnexpectedError', async () => {
    jest
      .spyOn(placeRepo, 'getAllWashrooms')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const getAllWashroomsResult = await getAllWashroomsUseCase.execute()

    expect(placeRepo.getAllWashrooms).toBeCalled()
    expect(getAllWashroomsResult.isErr()).toBe(true)
  })
})
