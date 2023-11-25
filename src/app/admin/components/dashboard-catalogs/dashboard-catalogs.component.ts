import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UsersComponent } from '../users/users.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TablesComponent } from '../tables/tables.component';

@Component({
  selector: 'app-dashboard-catalogs',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    UsersComponent,
    MatTabsModule,
    TablesComponent,
  ],
  templateUrl: './dashboard-catalogs.component.html',
  styleUrl: './dashboard-catalogs.component.scss',
})
export class DashboardCatalogsComponent {}
