// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// rxjs
import { Observable, throwError } from 'rxjs';
import { retry, catchError, timeout } from 'rxjs/operators';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(1), catchError(this.errorHandler));
  }

  private errorHandler(error) {
    if (error.status === 401) {
      // refresh token
    } else {
      return throwError(error);
    }
    // router.navigate(['error']);
  }
}
