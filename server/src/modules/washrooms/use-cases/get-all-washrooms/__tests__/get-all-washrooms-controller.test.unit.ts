import { mocks } from '../../../../../test-utils';
import { WashroomDTO } from '../../../mappers/washroom-dto';
import { Result } from '../../../../../shared/core/result';
import { GetAllWashroomsUseCase } from '../get-all-washrooms-use-case';
import { AppError } from '../../../../../shared/core/app-error';

jest.mock('../../../../infra/repos/implementations/mock-washroom-repo');

describe('GetAllWashoomsController', () => {
  const ids: Array<string> = [1, 2, 3].map(String);
  const mockWashroomDTOs: Array<WashroomDTO> = ids.map(mocks.mockWashroomDTO);
  const { getAllWashroomsController } = mocks.mockGetAllWashrooms();

  test('When executed, the GetAllWashoomsController returns 200 OK', async () => {
    jest
      .spyOn(GetAllWashroomsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.ok(mockWashroomDTOs));

    const { req, res } = mocks.mockHandlerParams();
    await getAllWashroomsController.execute(req, res);
    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res._getData());
    for (const mockWashroomDTO of mockWashroomDTOs) {
      expect(body).toContainEqual(mockWashroomDTO);
    }
  });

  test('If use case throws error, the GetAllWashoomsController responds 500', async () => {
    jest
      .spyOn(GetAllWashroomsUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')));

    const { req, res } = mocks.mockHandlerParams();
    await getAllWashroomsController.execute(req, res);
    expect(res.statusCode).toBe(500);
  });
});
