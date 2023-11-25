import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { environment } from '../../../../environments/environment.development';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Table } from '../../../interfaces/table.interface';
import { TableService } from '../../services/table.service';
import { ModalTableComponent } from '../modal-table/modal-table.component';

@Component({
  selector: 'app-table-tables',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './table-tables.component.html',
  styleUrl: './table-tables.component.scss',
})
export class TableTablesComponent implements OnInit {
  displayedColumns: string[] = [
    'number',
    'capacity',
    'table_status',
    'is_active',
    'actions',
  ];
  tables: Table[] = [];
  dataSource = new MatTableDataSource<Table>(this.tables);
  @ViewChild('paginator') paginator: MatPaginator | any;

  reverseConvertStatus: { [key: string]: string } = {
    available: 'Available',
    busy: 'Busy',
    outService: 'Out of service',
  };

  constructor(private tableService: TableService, private dialog: MatDialog) {}

  ngOnInit() {
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
        if (response.ok) {
          this.tables = response.results.map((table: Table) => {
            return {
              ...table,
              table_status: this.reverseConvertStatus[table.table_status[0]],
            };
          });
          this.dataSource.data = this.tables;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text:
            error.error.error ||
            error.error.data_error ||
            "Error can't get the tables",
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  onOpenModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const modalTable = this.dialog.open(ModalTableComponent, {
      width: '300px',
    });

    modalTable.afterClosed().subscribe((result) => {
      if (result?.ok) this.syncData();
    });
  }

  onEdit(event: Event, table: Table) {
    event.preventDefault();
    event.stopPropagation();
    const modalTable = this.dialog.open(ModalTableComponent, {
      width: '300px',
      data: {
        isEdit: true,
        table,
      },
    });

    modalTable.afterClosed().subscribe((result) => {
      if (result?.ok) this.syncData();
    });
  }

  onDelete(event: Event, table: Table) {
    event.preventDefault();
    event.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0702a6',
      cancelButtonColor: '#de3131',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTable(table.id);
      }
    });
  }

  deleteTable(id: number) {
    this.tableService.deleteTable(id).subscribe({
      next: (response: any) => {
        if (response) {
          Swal.fire({
            title: 'Deleted!',
            text: 'The table has been deleted.',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          this.syncData();
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text:
            error.error.error ||
            error.error.data_error ||
            "Error can't delete the table",
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
