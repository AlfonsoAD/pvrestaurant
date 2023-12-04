import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../../interfaces/menu.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalmMenuComponent } from '../modalm-menu/modalm-menu.component';

@Component({
  selector: 'app-table-menus',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: './table-menus.component.html',
  styleUrl: './table-menus.component.scss',
})
export class TableMenusComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'is_active',
    'created_at',
    'actions',
  ];
  menus: Menu[] = [];
  dataSource = new MatTableDataSource<Menu>(this.menus);
  @ViewChild('paginator') paginator: MatPaginator | any;

  constructor(private menuService: MenuService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.syncData();
  }

  syncData(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus().subscribe({
      next: (response: any) => {
        if (response.ok) {
          this.menus = response.results;
          this.dataSource.data = this.menus;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text:
            error.error.error || error.error.data_error || 'Error to get menus',
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
    const modalMenu = this.dialog.open(ModalmMenuComponent, {
      width: '300px',
    });
    modalMenu.afterClosed().subscribe((result) => {
      if (result.ok) this.syncData();
    });
  }

  onEdit(event: Event, menu: Menu) {
    event.preventDefault();
    event.stopPropagation();
    const modalMenu = this.dialog.open(ModalmMenuComponent, {
      width: '300px',
      data: { isEdit: true, menu },
    });

    modalMenu.afterClosed().subscribe((result) => {
      if (result.ok) this.syncData();
    });
  }

  onDelete(event: Event, menu: Menu) {
    event.preventDefault();
    event.stopPropagation();

    Swal.fire({
      title: `Are you sure to delete ${menu.name}?`,
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#0702a6',
      cancelButtonColor: '#de3131',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMenu(menu.id);
      }
    });
  }

  deleteMenu(id: number) {
    this.menuService.deleteMenu(id).subscribe({
      next: (resp: any) => {
        if (resp) {
          Swal.fire({
            title: 'Success!',
            text: 'Menu deleted successfully',
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
          title: 'Error',
          text:
            error.error.error ||
            error.error.data_error ||
            'Error to delete menu',
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
