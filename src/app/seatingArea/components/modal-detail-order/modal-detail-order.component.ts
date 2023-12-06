import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailOrder } from '../../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-detail-order',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatFormFieldModule,
  ],
  templateUrl: './modal-detail-order.component.html',
  styleUrl: './modal-detail-order.component.scss',
})
export class ModalDetailOrderComponent implements OnInit {
  form = this.formBuilder.group({
    quantity: ['', [Validators.required]],
  });

  detail!: DetailOrder;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private detailOrder: OrderService,
    private dialogRef: MatDialogRef<ModalDetailOrderComponent>
  ) {
    this.detail = data.detail;
  }

  ngOnInit(): void {
    this.form.patchValue({
      quantity: this.detail.articles_count.toString(),
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'The quantity is required and must be a number greater than 0',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      this.form.markAllAsTouched();
      return;
    }

    const body = {
      articles_count: this.form.controls.quantity.value,
      unit_price:
        Number(this.form.controls.quantity.value) *
        Number(this.detail.product.price),
    };

    this.updateDetailOrder(body);
  }

  updateDetailOrder(body: any) {
    this.detailOrder.patchDetailOrder(this.detail.id, body).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'The detail order was updated successfully',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          this.dialogRef.close({ ok: true });
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text:
            error.error.error ||
            error.error.data_error ||
            'The detail order could not be updated',
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
