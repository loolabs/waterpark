import { Washroom } from '../../domain/entities/washroom';
import { Result } from '../../../../shared/core/result';
import { AppError } from '../../../../shared/core/app-error';

export abstract class WashroomRepo {
  abstract getAllWashrooms(): Promise<Result<Array<Washroom>, AppError.UnexpectedError>>;
}
