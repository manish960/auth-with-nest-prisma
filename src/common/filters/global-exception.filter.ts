import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message || 'Internal server error';

    // Prisma Errors
    if (exception instanceof PrismaClientKnownRequestError) {
      status = 400;

      switch (exception.code) {
        case 'P2002':
          message = `Unique constraint failed on field: ${exception.meta?.target}`;
          break;
        case 'P2025':
          message = `Record not found`;
          break;
        default:
          message = exception.message;
      }
    }

    if (exception instanceof PrismaClientValidationError) {
      status = 400;
      message = 'Invalid data format sent to database';
    }

    if (exception instanceof PrismaClientInitializationError) {
      status = 500;
      message = `Database connection error`;
    }

    // Standard HTTP Errors
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      message = res.message || res.error || message;
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
      errors: Array.isArray(message) ? message : [message],
    });
  }
}
