import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { HttpErrorResponse, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { tap, catchError, of } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideHttpClient(
    //   // DI-based interceptors must be explicitly enabled.
    //   withInterceptorsFromDi(),
    // ),
    // {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
    provideHttpClient(
      withInterceptors([httpErrorInterceptor]),
    )
    ,provideZoneChangeDetection({ eventCoalescing: true })
    ,provideRouter(routes)
  ]
};

export function httpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router);
  console.log('HttpErrorInterceptor intercept', req);
  return next(req).pipe(

    tap((item) => {
      console.error('item', item);
    }),
    catchError((err: any) => {

      if (err instanceof HttpErrorResponse) {
        router.navigate(['/error'], { queryParams: { error: err.message } });
      }
      return of(err);
    })
  );
}