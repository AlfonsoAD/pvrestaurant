import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableProductsComponent } from '../table-products/table-products.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TableProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {}
