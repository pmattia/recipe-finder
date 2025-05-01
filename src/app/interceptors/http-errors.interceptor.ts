import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { 
      console.log('HttpErrorInterceptor constructor');
    }
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HttpErrorInterceptor intercept', req);
    return handler.handle(req)
      .pipe(

        tap((item) => {
          console.error('item', item);
        }),
        catchError((err: any) => {
  
          if (err instanceof HttpErrorResponse) {
            this.router.navigate(['/error'], { queryParams: { error: err.message } });
          }
          return of(err);
        })
      );
  }
}