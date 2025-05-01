import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap, catchError, of } from 'rxjs';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  