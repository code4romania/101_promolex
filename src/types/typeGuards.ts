import { ErrorResponse } from './ErrorResponse';

export const isErrorResponse = (data: unknown): data is ErrorResponse =>
  (data as ErrorResponse)?.error !== undefined;
