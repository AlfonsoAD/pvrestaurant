import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Product } from '../../../interfaces/products.interface';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { ProductsService } from '../../../admin/services/products.service';
import { DetailOrder } from '../../../interfaces/order.interface';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  form = this.formBuilder.group({
    product: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
  });

  idOrder!: number;
  productSelected!: Product;
  products: Product[] = [];
  detailsOrder: DetailOrder[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private detailsOrderService: OrderService,
    private productService: ProductsService
  ) {
    route.params.subscribe((params) => {
      this.idOrder = params['id'];
    });
  }

  ngOnInit(): void {
    this.syncData();
  }

  syncData(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.getProducts();
    this.getDetailsOrder();
  }

  getDetailsOrder() {
    this.detailsOrderService.getDetailsOrder(this.idOrder).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.detailsOrder = resp.results;
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text:
            err.error.error || err.error.data_error || 'Error getting orders',
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      },
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        if (response.ok) this.products = response.results;
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text:
            err.error.error || err.error.data_error || 'Error getting products',
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      },
    });
  }

  onSumit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the fields',
        icon: 'error',
        showConfirmButton: false,
        showCancelButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      this.form.markAllAsTouched();
      return;
    }

    const body = {
      order: this.idOrder,
      product: this.productSelected.id,
      articles_count: this.form.controls.quantity.value,
      unit_price:
        Number(this.productSelected.price) *
        Number(this.form.controls.quantity.value),
    };

    this.createDetailOrder(body);
  }

  createDetailOrder(body: any) {
    this.detailsOrderService.postDetailOrder(body).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success!',
            text: 'Product added to order',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          this.clearForm();
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text:
            error.error.error ||
            error.error.data_error ||
            "Can't add product to order",
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      },
      complete: () => this.getDetailsOrder(),
    });
  }

  onSelectedProduct(event: MatSelectChange) {
    this.productSelected = this.products.find(
      (product) => product.name === event.value
    )!;
  }

  calculateSubtotal() {
    return this.detailsOrder.reduce(
      (acc, detail) => acc + detail.unit_price,
      0
    );
  }

  clearForm() {
    this.form.patchValue({
      product: '',
      quantity: '',
    });
  }
}
