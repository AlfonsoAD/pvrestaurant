import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { MainMenuComponent } from './shared/pages/main-menu/main-menu.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { notLoginGuard } from './guards/not-login.guard';
import { validateTokenGuard } from './guards/validate-token.guard';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [notLoginGuard],
  },
  {
    title: 'PV Restaurant Menu',
    path: 'menu',
    component: MainMenuComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
    canActivate: [authenticatedGuard, validateTokenGuard],
  },
];
