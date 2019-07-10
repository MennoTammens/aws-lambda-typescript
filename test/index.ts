import { ApiContext, ApiEvent, ApiHandler, ApiResponse, ErrorResponseBody } from '../shared/api.interfaces';
import { ApiErrorResponseParsed, ApiResponseParsed, PathParameter } from './test.interfaces';

type SuccessCaller = <T> (handler: ApiHandler, pathParameters?: PathParameter) => Promise<ApiResponseParsed<T>>;
type FailureCaller = (handler: ApiHandler, pathParameters?: PathParameter) => Promise<ApiErrorResponseParsed>;

// tslint:disable-next-line arrow-return-shorthand (Long function body.)
export const callSuccess: SuccessCaller = async <T>(handler: ApiHandler, pathParameters?: PathParameter): Promise<ApiResponseParsed<T>> => {
    const event: ApiEvent = <ApiEvent> {};
    if (pathParameters) {
      event.pathParameters = pathParameters;
    }

    const result: ApiResponse = await handler(event, <ApiContext> {});
    if (typeof result === 'undefined') {
      throw new Error('No result was returned by the handler!');
    }

    const parsedResult: ApiResponseParsed<T> = result as ApiResponseParsed<T>;
    parsedResult.parsedBody = JSON.parse(result.body) as T;
    return parsedResult;
};

// tslint:disable-next-line arrow-return-shorthand (Long function body.)
export const callFailure: FailureCaller = async (handler: ApiHandler, pathParameters?: PathParameter): Promise<ApiErrorResponseParsed> => {
  // tslint:disable-next-line typedef (Well-known constructor.)
  const event: ApiEvent = <ApiEvent> {};
  if (pathParameters) {
    event.pathParameters = pathParameters;
  }

  const result: ApiResponse = await handler(event, <ApiContext> {});
  if (typeof result === 'undefined') {
    throw new Error('No result was returned by the handler!');
  }

  const parsedResult: ApiErrorResponseParsed = result as ApiErrorResponseParsed;
  parsedResult.parsedBody = JSON.parse(result.body) as ErrorResponseBody;
  return parsedResult;
};
