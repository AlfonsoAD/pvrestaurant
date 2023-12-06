import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableService } from '../../../admin/services/table.service';
import Swal from 'sweetalert2';
import { Table } from '../../../interfaces/table.interface';
import { CardTableComponent } from '../../components/card-table/card-table.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../interfaces/order.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-tables',
  standalone: true,
  imports: [CommonModule, CardTableComponent, MatIconModule, MatButtonModule],
  templateUrl: './main-tables.component.html',
  styleUrl: './main-tables.component.scss',
})
export class MainTablesComponent implements OnInit, OnChanges {
  tables: Table[] = [];
  orders: Order[] = [];

  constructor(
    private tableService: TableService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.syncData();
  }

  ngOnChanges() {}

  syncData(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.getTables();
    this.getOrders();
  }

  getTables() {
    this.tableService.getTables().subscribe({
      next: (response: any) => {
        if (response.ok) this.tables = response.results;
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text:
            err.error.error || err.error.data_error || 'Error to  get tables',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (response: any) => {
        if (response.ok) {
          this.orders = response.results.filter(
            (order: Order) =>
              order.process_status.includes('orderPending') ||
              order.process_status.includes('orderActive')
          );
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text:
            err.error.error || err.error.data_error || 'Error to  get orders',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
      complete: () => setTimeout(() => this.checkTablesInOrder(), 100),
    });
  }

  checkTablesInOrder() {
    this.tables.forEach((table) => {
      const order = this.orders.find((order) => order.table === table.id);
      if (order) table.hasOrder = true;
    });
  }

  orderTable(table: Table) {
    return this.orders.find((order) => order.table === table.id);
  }
}
