import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const notLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.statusAuth === AuthStatus.authenticated) {
    router.navigate(['/dashboard/menu']);
    return false;
  }

  return true;
};
