import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetailMenu } from '../../../interfaces/detailsMenu.interface';
import { MenuService } from '../../services/menu.service';
import { ProductsService } from '../../services/products.service';
import { DetailMenuService } from '../../services/detail-menu.service';
import { Product } from '../../../interfaces/products.interface';
import { Menu } from '../../../interfaces/menu.interface';
import { ModalmDetailsMenuComponent } from '../modalm-details-menu/modalm-details-menu.component';

@Component({
  selector: 'app-table-details-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './table-details-menu.component.html',
  styleUrl: './table-details-menu.component.scss',
})
export class TableDetailsMenuComponent implements OnInit {
  displayedColumns: string[] = [
    'menu',
    'product',
    'is_active',
    'created_at',
    'actions',
  ];
  detailsMenu: DetailMenu[] = [];
  dataSource = new MatTableDataSource<DetailMenu>(this.detailsMenu);
  @ViewChild('paginator') paginator: MatPaginator | any;
  products: Product[] = [];
  menus: Menu[] = [];

  constructor(
    private detailMenuService: DetailMenuService,
    private menuService: MenuService,
    private productService: ProductsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.syncData();
  }

  syncData(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (resp: any) => {
        if (resp.ok) this.products = resp.results;
      },
      complete: () => this.getMenus(),
    });
  }

  getMenus() {
    this.menuService.getMenus().subscribe({
      next: (resp: any) => {
        if (resp.ok) this.menus = resp.results;
      },
      complete: () => this.getDetailsMenu(),
    });
  }

  getDetailsMenu() {
    this.detailMenuService.getDetailsMenu().subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.detailsMenu = resp.results.map((detailMenu: any) => {
            return {
              id: detailMenu.id,
              menu: this.menus.find((menu: Menu) => menu.id === detailMenu.menu)
                ?.name,
              product: this.products.find(
                (product: Product) => product.id === detailMenu.product
              )?.name,
              is_active: detailMenu.is_active,
              created_at: detailMenu.created_at,
            };
          });
          this.dataSource.data = this.detailsMenu;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err: any) => {
        Swal.fire({
          title: 'Error',
          text:
            err.error.error ||
            err.error.data_error ||
            'Error to get details menu',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      },
    });
  }

  onOpenModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const modalDialog = this.dialog.open(ModalmDetailsMenuComponent, {
      width: '400px',
      data: {
        menus: this.menus,
        products: this.products,
        detailsMenu: this.detailsMenu,
      },
    });

    modalDialog.afterClosed().subscribe((result: any) => {
      if (result?.ok) this.syncData();
    });
  }

  // onEdit(event: Event, detailMenu: DetailMenu) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const modalDialog = this.dialog.open(ModalmDetailsMenuComponent, {
  //     width: '400px',
  //     data: {
  //       isEdit: true,
  //       menus: this.menus,
  //       products: this.products,
  //       detailsMenu: this.detailsMenu,
  //       detailMenu,
  //     },
  //   });

  //   modalDialog.afterClosed().subscribe((result: any) => {
  //     if (result?.ok) this.syncData();
  //   });
  // }

  onDelete(event: Event, detailMenu: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
