import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableTablesComponent } from '../table-tables/table-tables.component';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, TableTablesComponent],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
})
export class TablesComponent {}
