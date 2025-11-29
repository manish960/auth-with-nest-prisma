import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // if (data === null || data === undefined) {
        //   const request = context.switchToHttp().getRequest();
        //   const method = request.method;
        //   const url = request.url;

        //   throw new NotFoundException(
        //     `Resource not found for ${method} ${url}`,
        //   );
        // }
        return {
          success: true,
          message: 'OK',
          data,
        };
      }),
    );
  }
}
