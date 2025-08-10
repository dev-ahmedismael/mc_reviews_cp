import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface JwtPayload {
  exp?: number; // expiry timestamp in seconds
  [key: string]: any;
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;

    const payloadJson = atob(
      payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
    );
    return JSON.parse(payloadJson) as JwtPayload;
  } catch {
    return null;
  }
}

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // SSR check — allow navigation during server rendering
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem('auth_token');
  if (!token) {
    router.navigate(['/authentication/login']);
    return false;
  }

  const decoded = decodeJwt(token);
  if (!decoded) {
    localStorage.removeItem('auth_token');
    router.navigate(['/authentication/login']);
    return false;
  }

  // Check expiry if present
  if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('auth_token');
    router.navigate(['/authentication/login']);
    return false;
  }

  return true;
};
