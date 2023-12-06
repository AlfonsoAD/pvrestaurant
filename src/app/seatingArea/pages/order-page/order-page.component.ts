import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../../components/order/order.component';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, OrderComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
})
export class OrderPageComponent {}
