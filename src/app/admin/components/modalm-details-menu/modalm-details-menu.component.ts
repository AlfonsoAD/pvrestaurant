import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailMenuService } from '../../services/detail-menu.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Menu } from '../../../interfaces/menu.interface';
import { Product } from '../../../interfaces/products.interface';
import {} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DetailMenu } from '../../../interfaces/detailsMenu.interface';
import { interval } from 'rxjs';

@Component({
  selector: 'app-modalm-details-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './modalm-details-menu.component.html',
  styleUrl: './modalm-details-menu.component.scss',
})
export class ModalmDetailsMenuComponent {
  form = this.formBuilder.group({
    menu: ['', [Validators.required]],
    product: ['', [Validators.required]],
  });

  menus: Menu[] = [];
  products: Product[] = [];
  menuSelected!: Menu;
  productSelected!: Product;
  isEdit = false;
  detailMenu!: DetailMenu;
  detailsMenu: DetailMenu[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private detailsMenuService: DetailMenuService,
    private dialogRef: MatDialogRef<ModalmDetailsMenuComponent>
  ) {
    this.detailsMenu = data?.detailsMenu;
    this.menus = data?.menus;
    this.products = data?.products;

    if (data?.isEdit) {
      this.isEdit = true;
      this.detailMenu = data?.detailMenu;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Check the fields, please.',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      this.form.markAllAsTouched();
      return;
    }

    const body = {
      menu: this.menuSelected.id,
      product: this.productSelected.id,
    };
    this.createDetailMenu(body);
  }

  onSelectedMenu(event: MatSelectChange) {
    this.menuSelected = this.menus.find((c) => c.name === event.value)!;
  }

  onSelectedProduct(event: MatSelectChange) {
    this.productSelected = this.products.find((c) => c.name === event.value)!;
  }

  createDetailMenu(body: any) {
    this.detailsMenuService.postDetailsMenu(body).subscribe({
      next: (resp) => {
        if (resp) {
          Swal.fire({
            title: 'Success',
            text: 'Product added successfully to menu.',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          this.dialogRef.close({ ok: true });
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text:
            err.error.error ||
            err.error.data_error ||
            "Can't add product to menu.",
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      },
    });
  }
}
