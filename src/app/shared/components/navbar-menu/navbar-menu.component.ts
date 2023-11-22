import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsMenuComponent } from '../settings-menu/settings-menu.component';
import { modules } from '../../../utils/arrays';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    SettingsMenuComponent,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.scss',
})
export class NavbarMenuComponent {
  titleApp = 'Restaurant app';
  modules = modules;

  roles: { [key: string]: string } = {
    admin: 'Admin',
    cashier: 'Cashier',
    waiter: 'Waiter',
  };

  public user = computed(() => this.authService.user());

  constructor(private readonly authService: AuthService) {}
}
