import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs';

export const validateTokenGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.validateToken();
};
