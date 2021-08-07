import { mocks } from '../../../../../../test-utils'
import { AppError } from '../../../../../../shared/core/app-error'
import { Result } from '../../../../../../shared/core/result'
import { Place } from '../../../../domain/entities/place'
import { PlaceDTO } from '../../../../mappers/place-dto'

jest.mock('../../../../infra/repos/implementations/mock-place-repo')

describe('GetAllPlacesUseCase', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockPlaces: Array<Place> = ids.map(mocks.mockPlace)
  const mockPlaceDTOs: Array<PlaceDTO> = ids.map(mocks.mockPlaceDTO)
  const { placeRepo, getAllPlacesUseCase } = mocks.mockGetAllPlaces()

  test('When executed, should return all places and an Ok', async () => {
    jest.spyOn(placeRepo, 'getAllPlaces').mockResolvedValue(Result.ok(mockPlaces))

    const getAllPlacesResult = await getAllPlacesUseCase.execute()

    expect(placeRepo.getAllPlaces).toBeCalled()
    expect(getAllPlacesResult.isOk()).toBe(true)
    if (getAllPlacesResult.isOk()) {
      expect(getAllPlacesResult.value.length).toBe(ids.length)
      for (const mockPlaceDTO of mockPlaceDTOs) {
        expect(getAllPlacesResult.value).toContainEqual(mockPlaceDTO)
      }
    }
  })

  test('When repo throws error, should return AppError.UnexpectedError', async () => {
    jest
      .spyOn(placeRepo, 'getAllPlaces')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const getAllPlacesResult = await getAllPlacesUseCase.execute()

    expect(placeRepo.getAllPlaces).toBeCalled()
    expect(getAllPlacesResult.isErr()).toBe(true)
  })
})
