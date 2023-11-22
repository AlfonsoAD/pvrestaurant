import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modules } from '../../../utils/arrays';
import { CardMenuComponent } from '../../components/card-menu/card-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  modules = modules;
}
