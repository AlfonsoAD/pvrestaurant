import { computed, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const roleWaiterGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = computed(() => authService.user());

  if (user()?.roles.includes('admin') || user()?.roles.includes('waiter'))
    return true;

  return false;
};
