import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Table } from '../../../interfaces/table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-table',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './card-table.component.html',
  styleUrl: './card-table.component.scss',
})
export class CardTableComponent {
  @Input() table!: Table;

  constructor(private router: Router) {}

  createOrder(event: Event, table: Table) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigateByUrl(`/dashboard/seating-area/order/${table.id}`);
  }
}
