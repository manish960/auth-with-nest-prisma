// import {
//   Catch,
//   ExceptionFilter,
//   ArgumentsHost,
// } from '@nestjs/common';
// import {
//   PrismaClientKnownRequestError,
//   PrismaClientValidationError,
//   PrismaClientInitializationError,
// } from '@prisma/client/runtime/library';

// @Catch(
//   PrismaClientKnownRequestError,
//   PrismaClientValidationError,
//   PrismaClientInitializationError,
// )
// export class PrismaExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     let status = 400;
//     let message = 'Database error';

//     // Known Prisma errors (unique constraint, not found, etc.)
//     if (exception instanceof PrismaClientKnownRequestError) {
//       switch (exception.code) {
//         case 'P2002':
//           message = `Unique constraint failed on: ${exception.meta?.target}`;
//           break;
//         case 'P2025':
//           message = `Record not found`;
//           break;
//         default:
//           message = exception.message;
//       }
//     }

//     // Validation errors
//     if (exception instanceof PrismaClientValidationError) {
//       message = 'Validation error: Invalid data format';
//     }

//     // DB initialization errors
//     if (exception instanceof PrismaClientInitializationError) {
//       message = `Prisma initialization error: ${exception.message}`;
//       status = 500;
//     }

//     response.status(status).json({
//       statusCode: status,
//       error: message,
//     });
//   }
// }

import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = 400;
    let message = 'Database error';

    // Known Prisma errors
    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          message = `Unique constraint failed on: ${exception.meta?.target}`;
          break;
        case 'P2025':
          message = `Record not found`;
          break;
        default:
          message = exception.message;
      }
    }

    // Data validation errors
    if (exception instanceof PrismaClientValidationError) {
      message = 'Invalid data format';
    }

    // Database connection errors
    if (exception instanceof PrismaClientInitializationError) {
      status = 500;
      message = `Database initialization error: ${exception.message}`;
    }

    response.status(status).json({
      statusCode: status,
      error: message,
    });
  }
}
