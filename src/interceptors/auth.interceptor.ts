import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const csrfToken = cookieService.get('XSRF-TOKEN');

  let headers = req.headers;

  if (csrfToken) headers = headers.set('X-XSRF-TOKEN', csrfToken);

  const authReq = req.clone({ headers, withCredentials: true });

  if (typeof window === 'undefined') {
    return next(authReq);
  }

  return next(authReq).pipe(
    tap({
      error: (err) => {
        if (err.status === 401) {
          router.navigate(['/authentication/login']);
        }
      },
    })
  );
};
