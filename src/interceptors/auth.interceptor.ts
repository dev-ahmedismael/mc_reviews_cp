import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const platformId = inject(PLATFORM_ID);

  // Only try to access localStorage in the browser
  let token: string | null = null;
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('auth_token'); // or sessionStorage
  }

  let headers = req.headers;
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({ headers });

  // Skip navigation/error handling during SSR
  if (!isPlatformBrowser(platformId)) {
    return next(authReq);
  }

  const router = inject(Router);

  return next(authReq).pipe(
    tap({
      error: (err) => {
        if (err?.status === 401) {
          // Optionally remove the token if it's invalid
          localStorage.removeItem('auth_token');
          router.navigate(['/authentication/login']);
        }
      },
    })
  );
};
