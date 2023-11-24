import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modules } from '../../../utils/arrays';
import { CardMenuComponent } from '../../components/card-menu/card-menu.component';
import { RouterLink } from '@angular/router';
import { RoleUserDirective } from '../../../directives/role-user.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardMenuComponent, RouterLink, RoleUserDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  modules = modules;
}
