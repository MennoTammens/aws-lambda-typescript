import { ApiContext, ApiEvent, ApiHandler, ApiResponse } from '../../shared/api.interfaces';
import { ConfigurationErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { GetSwaggerResult } from './swagger.interfaces';
import { SwaggerService } from './swagger.service';

export class SwaggerController {
  public constructor(private readonly _service: SwaggerService) {
  }

  public getSwaggerJson: ApiHandler = async (event: ApiEvent, context: ApiContext): Promise<ApiResponse> => {
    try {
      const result: GetSwaggerResult = await this._service.getSwaggerDescription();
      return ResponseBuilder.ok<GetSwaggerResult>(result);  // tslint:disable-line arrow-return-shorthand
    } catch (error) {
      if (error instanceof NotFoundResult) {
        return ResponseBuilder.notFound(error.code, error.description);
      }

      if (error instanceof ForbiddenResult) {
        return ResponseBuilder.forbidden(error.code, error.description);
      }

      if (error instanceof ConfigurationErrorResult) {
        return ResponseBuilder.configurationError(error.code, error.description);
      }

      return ResponseBuilder.internalServerError();
    }
  }
}
