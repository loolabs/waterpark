import { Washroom } from '../domain/entities/washroom';
import { Result } from '../../../shared/core/result';
import { AppError } from '../../../shared/core/app-error';

export type WashroomOptions = {
  // if true, the repo MUST include the reviews in the returned Washrooms
  mustIncludeReviews?: boolean;
};

export abstract class WashroomRepo {
  abstract getAllWashrooms(
    options?: WashroomOptions
  ): Promise<Result<Array<Washroom>, AppError.UnexpectedError>>;

  abstract getWashroomById(
    id: string,
    options?: WashroomOptions
  ): Promise<Result<Washroom, AppError.UnexpectedError>>;
}
