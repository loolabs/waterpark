import { mocks } from '../../../../../test-utils'
import { AppError } from '../../../../../shared/core/app-error'
import { Result } from '../../../../../shared/core/result'
import { Washroom } from '../../../domain/entities/washroom'
import { WashroomDTO } from '../../../mappers/washroom-dto'

jest.mock('../../../repos')

describe('GetWashroomByIdUseCase', () => {
  const id: string = String(1)
  const mockWashroom: Washroom = mocks.mockWashroom(id)
  const mockWashroomDTO: WashroomDTO = mocks.mockWashroomDTO(id)
  const { washroomRepo, getWashroomByIdUseCase } = mocks.mockGetWashroomById()

  test('When executed, should return the washroom', async () => {
    jest.spyOn(washroomRepo, 'getById').mockResolvedValue(Result.ok(mockWashroom))

    const result = await getWashroomByIdUseCase.execute({ id })

    expect(washroomRepo.getById).toBeCalled()
    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toStrictEqual(mockWashroomDTO)
    }
  })

  test('When repo throws error, should return AppError.UnexpectedError', async () => {
    jest
      .spyOn(washroomRepo, 'getById')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')))

    const result = await getWashroomByIdUseCase.execute({ id })

    expect(washroomRepo.getById).toBeCalled()
    expect(result.isErr()).toBe(true)
  })
})
