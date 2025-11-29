// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import {
//   PrismaClientKnownRequestError,
//   PrismaClientInitializationError,
//   PrismaClientValidationError,
// } from '@prisma/client/runtime/library';

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     let status = HttpStatus.INTERNAL_SERVER_ERROR;
//     let message = exception.message || 'Internal server error';

//     // Prisma Errors
//     if (exception instanceof PrismaClientKnownRequestError) {
//       status = 400;

//       switch (exception.code) {
//         case 'P2002':
//           message = `Unique constraint failed on field: ${exception.meta?.target}`;
//           break;
//         case 'P2025':
//           message = `Record not found`;
//           break;
//         default:
//           message = exception.message;
//       }
//     }

//     if (exception instanceof PrismaClientValidationError) {
//       status = 400;
//       message = 'Invalid data format sent to database';
//     }

//     if (exception instanceof PrismaClientInitializationError) {
//       status = 500;
//       message = `Database connection error`;
//     }

//     // Standard HTTP Errors
//     if (exception instanceof HttpException) {
//       status = exception.getStatus();
//       const res: any = exception.getResponse();
//       message = res.message || res.error || message;
//     }

//     response.status(status).json({
//       success: false,
//       message,
//       data: null,
//       errors: Array.isArray(message) ? message : [message],
//     });
//   }
// }







// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';

// @Catch(HttpException)
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;

//     const errorResponse = exception.getResponse?.();

//     let message: string | string[] = 'An error occurred';

//     // Case 1: string error
//     if (typeof errorResponse === 'string') {
//       message = errorResponse;
//     }

//     // Case 2: object error
//     else if (typeof errorResponse === 'object') {
//       const resObj: any = errorResponse;

//       if (Array.isArray(resObj.message)) {
//         // Validation error array
//         message = resObj.message;
//       } else if (resObj.message) {
//         message = resObj.message;
//       } else if (resObj.error) {
//         message = resObj.error;
//       }
//     }

//     // Fallback to exception.message if nothing matched
//     if (!message) {
//       message = exception.message;
//     }

//     return response.status(status).json({
//       success: false,
//       message: Array.isArray(message) ? message[0] : message,
//       data: null,
//       errors: Array.isArray(message) ? message : [message],
//     });
//   }
// }






import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = exception.getResponse?.();

    let message: string = 'An error occurred';
    let fieldErrors: Record<string, string[]> | null = null;

    // Case 1: error is a string
    if (typeof errorResponse === 'string') {
      message = errorResponse;
    }

    // Case 2: object error (ValidationPipe, Http errors)
    else if (typeof errorResponse === 'object') {
      const resObj: any = errorResponse;

      // If ValidationPipe produced an array of messages
      // Example:
      // ["firstName should not be empty", "firstName must be a string"]
      if (Array.isArray(resObj.message)) {
        fieldErrors = this.groupValidationErrors(resObj.message);
        message = 'Validation failed';
      }

      // If it's a single message string
      else if (typeof resObj.message === 'string') {
        message = resObj.message;
      }

      // HttpException with `error` field
      else if (resObj.error) {
        message = resObj.error;
      }
    }

    return response.status(status).json({
      success: false,
      message,
      data: null,
      errors: fieldErrors ?? { general: [message] },
    });
  }

  // 🟩 Group validation errors by field
  private groupValidationErrors(errors: string[]): Record<string, string[]> {
    const grouped: Record<string, string[]> = {};

    errors.forEach((err) => {
      // First word before space is the field name
      const [field, ...rest] = err.split(' ');
      const msg = rest.join(' ').trim();

      if (!grouped[field]) {
        grouped[field] = [];
      }

      grouped[field].push(msg);
    });

    return grouped;
  }
}
