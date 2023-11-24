import { inject, computed } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const roleAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = computed(() => authService.user());

  if (user()?.roles.includes('admin')) return true;

  return false;
};
