import { mocks } from '../../../../../test-utils';
import { WashroomDTO } from '../../../mappers/washroom-dto';
import { Result } from '../../../../../shared/core/result';
import { GetWashroomByIdUseCase } from '../get-washroom-by-id-use-case';
import { AppError } from '../../../../../shared/core/app-error';

jest.mock('../../../repos/mock-washroom-repo');

describe('GetWashroomByIdController', () => {
  const id: string = String(1);
  const mockWashroomDTO: WashroomDTO = mocks.mockWashroomDTO(id);
  const { getWashroomByIdController } = mocks.mockGetWashroomById();

  test('If use case executes successfully, should respond 200 OK', async () => {
    jest
      .spyOn(GetWashroomByIdUseCase.prototype, 'execute')
      .mockResolvedValue(Result.ok(mockWashroomDTO));

    const { req, res } = mocks.mockHandlerParams();
    await getWashroomByIdController.execute(req, res);
    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res._getData());
    expect(body).toStrictEqual(mockWashroomDTO);
  });

  test('If use case throws error, should respond 500', async () => {
    jest
      .spyOn(GetWashroomByIdUseCase.prototype, 'execute')
      .mockResolvedValue(Result.err(new AppError.UnexpectedError('Pretend something failed.')));

    const { req, res } = mocks.mockHandlerParams();
    await getWashroomByIdController.execute(req, res);
    expect(res.statusCode).toBe(500);
  });
});
