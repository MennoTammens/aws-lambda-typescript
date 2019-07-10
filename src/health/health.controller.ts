import { ApiContext, ApiEvent, ApiHandler, ApiResponse } from '../../shared/api.interfaces';
import { ResponseBuilder } from '../../shared/response-builder';
import { GetHealthCheckDetailedResult, GetHealthCheckResult } from './health.interfaces';

export class HealthController {
  public getHealthCheck: ApiHandler = async (event: ApiEvent, context: ApiContext): Promise<ApiResponse> => {
    const result: GetHealthCheckResult = {
      success: true
    };

    return ResponseBuilder.ok<GetHealthCheckResult>(result);
  }

  public getHealthCheckDetailed: ApiHandler = async (event: ApiEvent, context: ApiContext): Promise<ApiResponse> => {
    const result: GetHealthCheckDetailedResult = {
      requestId: event.requestContext.requestId,
      success: true
    };

    return ResponseBuilder.ok<GetHealthCheckDetailedResult>(result);
  }
}
