import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';  // tslint:disable-line no-implicit-dependencies (Using only the type information from the @types package.)
import { ErrorResult } from './errors';

// Type aliases to hide the 'aws-lambda' package and have consistent, short naming.
export type ApiContext = Context;
export type ApiEvent = APIGatewayEvent;
export type ApiHandler = (event: APIGatewayEvent, context: Context) => Promise<APIGatewayProxyResult>;
export type ApiResponse = APIGatewayProxyResult;

export interface ErrorResponseBody {
  error: ErrorResult;
}
