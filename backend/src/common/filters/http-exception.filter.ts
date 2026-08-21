import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Every error thrown anywhere in the app (validation, auth, not-found, or an
 * uncaught bug) passes through here and comes out in the same shape:
 *
 * {
 *   "statusCode": 400,
 *   "path": "/api/tasks",
 *   "timestamp": "...",
 *   "message": "title should not be empty"
 * }
 *
 * This means the frontend only ever needs one error-handling code path.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException ? exception.getResponse() : null;
    const message =
      (exceptionResponse as any)?.message ??
      (exception as Error)?.message ??
      'Internal server error';

    if (status >= 500) {
      this.logger.error(message, (exception as Error)?.stack);
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
