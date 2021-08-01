import express from 'express';
import { ControllerWithoutDTO } from '../../../../shared/app/controller-without-dto';
import { GetAllWashroomsUseCase } from './get-all-washrooms-use-case';

export class GetAllWashroomsController extends ControllerWithoutDTO<GetAllWashroomsUseCase> {
  constructor(useCase: GetAllWashroomsUseCase) {
    super(useCase);
  }

  async execute<Res extends express.Response>(_req: express.Request, res: Res): Promise<Res> {
    const result = await this.useCase.execute();
    if (result.isOk()) {
      return this.ok(res, result.value);
    } else {
      return this.fail(res, result.error.message);
    }
  }
}
