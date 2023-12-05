import { Component, Input, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Table } from '../../../interfaces/table.interface';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-card-table',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatBadgeModule],
  templateUrl: './card-table.component.html',
  styleUrl: './card-table.component.scss',
})
export class CardTableComponent {
  @Input() table!: Table;
  @Input() order!: any;

  get user() {
    return computed(() => this.authService.user());
  }

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  createOrder(event: Event, table: Table) {
    event.preventDefault();
    event.stopPropagation();

    if (table.hasOrder && this.order) {
      this.router.navigateByUrl(
        `/dashboard/seating-area/order/${this.order.id}`
      );
      return;
    }

    const data = {
      table: table.id,
      user: this.user()?.id,
    };
    this.postOrder(data);
  }

  postOrder(body: any) {
    this.orderService.postOrder(body).subscribe({
      next: (response: any) => {
        if (response.ok) {
          this.router.navigateByUrl(
            `/dashboard/seating-area/order/${response.results.id}`
          );
        }
      },
    });
  }
}
