import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDetailsMenuComponent } from '../table-details-menu/table-details-menu.component';

@Component({
  selector: 'app-details-menu',
  standalone: true,
  imports: [CommonModule, TableDetailsMenuComponent],
  templateUrl: './details-menu.component.html',
  styleUrl: './details-menu.component.scss',
})
export class DetailsMenuComponent {}
