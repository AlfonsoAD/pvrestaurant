import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCatalogsComponent } from '../../components/dashboard-catalogs/dashboard-catalogs.component';

@Component({
  selector: 'app-main-catalogs',
  standalone: true,
  imports: [CommonModule, DashboardCatalogsComponent],
  templateUrl: './main-catalogs.component.html',
  styleUrl: './main-catalogs.component.scss',
})
export class MainCatalogsComponent {}
