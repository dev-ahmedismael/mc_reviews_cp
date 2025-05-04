import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(ApiService);
  const router = inject(Router);

  if (typeof window === 'undefined') {
    return true;
  }
  return auth.isAuthenticated().pipe(
    take(1),
    tap((isAuth) => {
      if (!isAuth) {
        router.navigate(['/authentication/login']);
      }
    })
  );
};
