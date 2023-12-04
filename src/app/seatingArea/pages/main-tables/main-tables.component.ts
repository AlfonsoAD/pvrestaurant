import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableService } from '../../../admin/services/table.service';
import Swal from 'sweetalert2';
import { Table } from '../../../interfaces/table.interface';
import { CardTableComponent } from '../../components/card-table/card-table.component';

@Component({
  selector: 'app-main-tables',
  standalone: true,
  imports: [CommonModule, CardTableComponent],
  templateUrl: './main-tables.component.html',
  styleUrl: './main-tables.component.scss',
})
export class MainTablesComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.syncData();
  }

  syncData(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.getTables();
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
}
