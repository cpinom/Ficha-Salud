import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { AppGlobal } from '../../app.global';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private spinnerService = inject(SpinnerService);
  private global = inject(AppGlobal);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.global.environment === 'production') {
          window.location.href = 'https://www.inacap.cl';
        }
        return throwError(() => error);
      }),
      finalize(() => this.spinnerService.hide())
    );
  }

}
