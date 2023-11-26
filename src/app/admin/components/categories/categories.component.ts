import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCategoriesComponent } from '../table-categories/table-categories.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, TableCategoriesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {}
