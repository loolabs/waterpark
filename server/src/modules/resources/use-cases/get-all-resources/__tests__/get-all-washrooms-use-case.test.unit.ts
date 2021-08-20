import { mocks } from '../../../../../test-utils'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { Washroom } from '../../../domain/entities/washroom'
import { WashroomDTO } from '../../../mappers/washroom-dto'

jest.mock('../../../repos')

describe('GetAllWashroomsUseCase', () => {
  const ids: Array<string> = [1, 2, 3].map(String)
  const mockWashrooms: Array<Washroom> = ids.map(mocks.mockWashroom)
  const mockWashroomDTOs: Array<WashroomDTO> = ids.map(mocks.mockWashroomDTO)
  const { washroomRepo, getAllWashroomsUseCase } = mocks.mockGetAllWashrooms()

  test('When executed, should return all washrooms and an Ok', async () => {
    jest.spyOn(washroomRepo, 'getAll').mockResolvedValue(Result.ok(mockWashrooms))

    const result = await getAllWashroomsUseCase.execute()

    expect(washroomRepo.getAll).toBeCalled()
    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value.length).toBe(ids.length)
      for (const mockWashroomDTO of mockWashroomDTOs) {
        expect(result.value).toContainEqual(mockWashroomDTO)
      }
    }
  })

  test('When repo throws error, should return AppError.UnexpectedError', async () => {
    jest
      .spyOn(washroomRepo, 'getAll')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const result = await getAllWashroomsUseCase.execute()

    expect(washroomRepo.getAll).toBeCalled()
    expect(result.isErr()).toBe(true)
  })
})
