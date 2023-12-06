import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { MainMenuComponent } from './shared/pages/main-menu/main-menu.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { notLoginGuard } from './guards/not-login.guard';
import { validateTokenGuard } from './guards/validate-token.guard';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';
import { MainCatalogsComponent } from './admin/pages/main-catalogs/main-catalogs.component';
import { roleAdminGuard } from './guards/role-admin.guard';
import { ViewMenuComponent } from './public/pages/view-menu/view-menu.component';
import { roleWaiterGuard } from './guards/role-waiter.guard';
import { MainTablesComponent } from './seatingArea/pages/main-tables/main-tables.component';
import { OrderPageComponent } from './seatingArea/pages/order-page/order-page.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [notLoginGuard],
  },
  {
    title: 'PV Restaurant Menu',
    path: 'dashboard',
    component: MainMenuComponent,
    children: [
      {
        path: 'menu',
        component: DashboardComponent,
      },
      {
        path: 'admin',
        component: MainCatalogsComponent,
        canActivate: [roleAdminGuard],
      },
      {
        path: 'seating-area',
        component: MainTablesComponent,
        canActivate: [roleWaiterGuard],
      },
      {
        path: 'seating-area/order/:id',
        component: OrderPageComponent,
        canActivate: [roleWaiterGuard],
      },
    ],
    canActivate: [authenticatedGuard, validateTokenGuard],
  },
  {
    title: 'Menus',
    path: 'public/menu',
    component: ViewMenuComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
