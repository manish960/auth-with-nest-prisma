// import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
// import {
//   PrismaClientKnownRequestError,
//   PrismaClientInitializationError,
//   PrismaClientValidationError,
// } from '@prisma/client/runtime/library';

// @Catch(
//   PrismaClientKnownRequestError,
//   PrismaClientInitializationError,
//   PrismaClientValidationError,
// )
// export class PrismaExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     let status = 400;
//     let message = 'Database error';

//     // Known Prisma errors
//     if (exception instanceof PrismaClientKnownRequestError) {
//       switch (exception.code) {
//         case 'P2002':
//           message = `Unique constraint failed on: ${exception.meta?.target}`;
//           break;
//         case 'P2025':
//           message = `Record not found`;
//           break;
//         case 'P2003':
//           message = 'Foreign key constraint failed (invalid related ID)';
//           break;
//         case 'P2002':
//           message = 'Record already exists';
//           break;
//         default:
//           message = exception.message;
//       }
//     }

//     // Data validation errors
//     if (exception instanceof PrismaClientValidationError) {
//       message = 'Invalid data format';
//     }

//     // Database connection errors
//     if (exception instanceof PrismaClientInitializationError) {
//       status = 500;
//       message = `Database initialization error: ${exception.message}`;
//     }

//     response.status(status).json({
//       statusCode: status,
//       error: message,
//     });
//   }
// }

// import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
// import {
//   PrismaClientKnownRequestError,
//   PrismaClientInitializationError,
//   PrismaClientValidationError,
// } from '@prisma/client/runtime/library';

// @Catch(
//   PrismaClientKnownRequestError,
//   PrismaClientInitializationError,
//   PrismaClientValidationError,
// )
// export class PrismaExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     let status = 400;
//     let message = 'Database error';

//     // Prisma known errors
//     if (exception instanceof PrismaClientKnownRequestError) {
//       switch (exception.code) {
//         case 'P2002':
//           message = `Unique constraint failed on: ${exception.meta?.target}`;
//           break;

//         case 'P2003':   // FOREIGN KEY ERROR
//           message = 'Foreign key constraint failed (invalid related ID)';
//           break;

//         case 'P2025':
//           message = 'Record not found';
//           break;

//         default:
//           message = exception.message;
//           break;
//       }
//     }

//     // Validation errors
//     if (exception instanceof PrismaClientValidationError) {
//       message = 'Invalid data format';
//     }

//     // DB initialization errors
//     if (exception instanceof PrismaClientInitializationError) {
//       status = 500;
//       message = `Database initialization error: ${exception.message}`;
//     }

//     return response.status(status).json({
//       statusCode: status,
//       message,
//       error: exception.meta ?? null,
//     });
//   }
// }





// import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
// import { Prisma } from 'generated/prisma/client';

// @Catch(
//   Prisma.PrismaClientKnownRequestError,
//   Prisma.PrismaClientInitializationError,
//   Prisma.PrismaClientValidationError,
// )
// export class PrismaExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     let status = 400;
//     let message = 'Database error';

//     // Known Prisma errors
//     if (exception instanceof Prisma.PrismaClientKnownRequestError) {
//       switch (exception.code) {
//         case 'P2002':
//           message = `Unique constraint failed on: ${exception.meta?.target}`;
//           break;

//         case 'P2003':
//           message = 'Foreign key constraint failed (invalid related ID)';
//           break;

//         case 'P2025':
//           message = 'Record not found';
//           break;

//         default:
//           message = exception.message;
//       }
//     }

//     // Validation errors
//     if (exception instanceof Prisma.PrismaClientValidationError) {
//       message = 'Invalid data format';
//     }

//     // Initialization errors
//     if (exception instanceof Prisma.PrismaClientInitializationError) {
//       status = 500;
//       message = 'Database initialization error';
//     }

//     return response.status(status).json({
//       statusCode: status,
//       message,
//       error: exception.meta ?? null,
//     });
//   }
// }





import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} from '@prisma/client/runtime/library';

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'Database error';

    // Known Prisma errors
    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          message = `Unique constraint failed on: ${exception.meta?.target}`;
          break;

        case 'P2003':
          message = 'Foreign key constraint failed (invalid related ID)';
          break;

        case 'P2025':
          message = 'Record not found';
          break;

        default:
          message = exception.message;
          break;
      }
    }

    // Validation errors
    if (exception instanceof PrismaClientValidationError) {
      message = 'Invalid data format';
    }

    // Initialization errors
    if (exception instanceof PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database initialization error';
    }

    return response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
