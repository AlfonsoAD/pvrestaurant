import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../interfaces/categories.interface';
import { Product } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-modal-product',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.scss',
})
export class ModalProductComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    category: [''],
  });

  categorySelected!: Category | null | undefined;
  categories: Category[] = [];
  picture: string = '';
  isEdit: boolean = false;
  product!: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalProductComponent>
  ) {
    if (data?.isEdit) {
      this.isEdit = true;
      this.product = data.product;
      this.form.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        category: this.categoryProduct(this.product.category)?.name,
      });
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please complete all the fields',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      this.form.markAllAsTouched();
      return;
    }

    const product = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      price: this.form.controls.price.value,
      category: this.categorySelected?.id,
    };

    if (this.isEdit) {
      const body = { id: this.product.id, ...product };
      this.editProduct(body);
      return;
    }

    this.createProduct(product);
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.results;
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text:
            err.error.error || err.error.data_error || "Can't get categories",
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  createProduct(product: any) {
    this.productService.postProduct(product, this.picture).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success!',
            text: 'Product created successfully',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          this.dialogRef.close({ ok: true });
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text:
            err.error.error || err.error.data_error || "Can't create product",
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  editProduct(product: any) {
    this.productService.putProduct(product, this.picture).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success!',
            text: 'Product updated successfully',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          this.dialogRef.close({ ok: true });
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text:
            err.error.error || err.error.data_error || "Can't update product",
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  onFileSelected(event: any) {
    for (let index = 0; index < event.target.files.length; index++) {
      const file = event.target.files[index];
      let reader = new FileReader();
      let picture = file;
      reader.readAsDataURL(picture);
      reader.onload = (_event) => {
        picture = reader.result as string;
        this.picture = picture;
      };
    }
  }

  onSelected(event: MatSelectChange) {
    this.categorySelected = this.categories.find((c) => c.name === event.value);
  }

  categoryProduct(categoryId: number) {
    this.categorySelected = this.categories.find((c) => c.id === categoryId);
    return this.categorySelected;
  }
}
