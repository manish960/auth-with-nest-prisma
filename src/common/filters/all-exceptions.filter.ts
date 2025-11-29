// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpStatus,
// } from '@nestjs/common';

// @Catch() // catches ANY error
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     // If the exception has a status, use it
//     const status =
//       exception?.status ||
//       exception?.getStatus?.() ||
//       HttpStatus.INTERNAL_SERVER_ERROR;

//     const message =
//       exception?.message ||
//       'Something went wrong on the server';

//     // Optional: log the entire exception for debugging
//     console.error('Unhandled Exception:', exception);

//     return response.status(status).json({
//       success: false,
//       message,
//       data: null,
//       errors: [message],
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

// import {
//   PrismaClientKnownRequestError,
//   PrismaClientValidationError,
//   PrismaClientInitializationError,
// } from '@prisma/client/runtime/library';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     // ❌ DO NOT handle Prisma (let PrismaExceptionFilter handle it)
//     if (
//       exception instanceof PrismaClientKnownRequestError ||
//       exception instanceof PrismaClientValidationError ||
//       exception instanceof PrismaClientInitializationError
//     ) {
//       return; // ignore → allow other filters to catch it
//     }

//     // ❌ DO NOT handle HttpException (let GlobalExceptionFilter handle it)
//     if (exception instanceof HttpException) {
//       return;
//     }

//     // 🟩 Only handle runtime errors now
//     const status = HttpStatus.INTERNAL_SERVER_ERROR;
//     const message = exception?.message || 'Internal server error';

//     console.error('UNHANDLED RUNTIME ERROR:', exception);

//     return response.status(status).json({
//       success: false,
//       message,
//       data: null,
//       errors: [message],
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

// @Catch(Error) // <-- IMPORTANT: only catches JS runtime errors now
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: Error, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     // Ignore HttpExceptions → let GlobalExceptionFilter handle them
//     if (exception instanceof HttpException) {
//       return;
//     }

//     // Ignore Prisma errors → let PrismaExceptionFilter handle them
//     if (
//       (exception as any).code && 
//       typeof (exception as any).code === 'string' &&
//       (exception as any).code.startsWith('P')
//     ) {
//       return;
//     }

//     // Handle ONLY real runtime errors
//     const status = HttpStatus.INTERNAL_SERVER_ERROR;
//     const message = exception.message || 'Internal server error';

//     console.error('UNHANDLED RUNTIME ERROR:', exception);

//     return response.status(status).json({
//       success: false,
//       message,
//       data: null,
//       errors: [message],
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

import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // ❗ 1. Skip Prisma errors (let PrismaExceptionFilter handle them)
    if (
      exception instanceof PrismaClientKnownRequestError ||
      exception instanceof PrismaClientValidationError ||
      exception instanceof PrismaClientInitializationError
    ) {
      return; // DO NOT SEND RESPONSE → "pass through" to next filter
    }

    // ❗ 2. Skip HttpExceptions (let GlobalExceptionFilter handle them)
    if (exception instanceof HttpException) {
      return; // DO NOT SEND RESPONSE
    }

    // 🟢 3. Now ONLY handle real runtime errors
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal server error';

    console.error('🔥 UNHANDLED RUNTIME ERROR:', exception);

    return response.status(status).json({
      success: false,
      message,
      data: null,
      errors: [message],
    });
  }
}
