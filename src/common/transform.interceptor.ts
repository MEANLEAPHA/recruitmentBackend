import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ⏱️ Start Time: Record exactly when the request hit the server
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      map((data) => {
        // ⏱️ Stop Time: Calculate how long the controller took to finish
        const duration = Date.now() - startTime;
        
        // Log the performance directly to your terminal console
        console.log(`[🚀 Performance] ${method} ${url} took ${duration}ms`);

        // Wrap your raw controller data automatically
        return {
          success: true,
          timestamp: new Date().toISOString(),
          duration: `${duration}ms`,
          result: data,
        };
      }),
    );
  }
}
