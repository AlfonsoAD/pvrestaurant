import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { environment } from '../../../../environments/environment.development';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { Product } from '../../../interfaces/products.interface';
import { ModalProductComponent } from '../modal-product/modal-product.component';

@Component({
  selector: 'app-table-products',
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
    NgOptimizedImage,
  ],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss',
})
export class TableProductsComponent implements OnInit {
  public cloudinaryURL = environment.cloudinaryURL;

  displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'image',
    'is_active',
    'created_at',
    'actions',
  ];
  products: Product[] = [];
  dataSource = new MatTableDataSource<Product>(this.products);
  @ViewChild('paginator') paginator: MatPaginator | any;

  constructor(
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
      next: (response: any) => {
        if (response.ok) {
          this.products = response.results;
          this.dataSource.data = this.products;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.error || err.error.data_error || "Can't get products",
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
    const modalProduct = this.dialog.open(ModalProductComponent, {
      width: '500px',
    });
    modalProduct.afterClosed().subscribe((result) => {
      if (result?.ok) this.syncData();
    });
  }

  onEdit(event: Event, product: Product) {
    event.preventDefault();
    event.stopPropagation();
    const modalProduct = this.dialog.open(ModalProductComponent, {
      width: '500px',
      data: { isEdit: true, product },
    });

    modalProduct.afterClosed().subscribe((result) => {
      if (result?.ok) this.syncData();
    });
  }

  onDelete(event: Event, product: Product) {
    event.preventDefault();
    event.stopPropagation();
    Swal.fire({
      title: `Are you sure delete this product ${product.name}?`,
      text: `You won't be able to revert this!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0702a6',
      cancelButtonColor: '#de3131',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) this.deleteProduct(product.id);
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response: any) => {
        if (response.ok) {
          Swal.fire({
            title: 'Deleted!',
            text: response.results,
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          this.syncData();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text:
            err.error.error || err.error.data_error || "Can't delete product",
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
