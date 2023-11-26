import { Component, Inject } from '@angular/core';
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
import { CategoriesService } from '../../services/categories.service';
import Swal from 'sweetalert2';
import { Category } from '../../../interfaces/categories.interface';

@Component({
  selector: 'app-modal-categorie',
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
  ],
  templateUrl: './modal-categorie.component.html',
  styleUrl: './modal-categorie.component.scss',
})
export class ModalCategorieComponent {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  isEdit: boolean = false;
  category!: Category;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private dialogRef: MatDialogRef<ModalCategorieComponent>
  ) {
    if (data?.isEdit) {
      this.isEdit = true;
      this.category = data.category;
      this.form.patchValue({
        name: this.category.name,
        description: this.category.description,
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Please check the form fields',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      this.form.markAllAsTouched();
      return;
    }

    const { name, description } = this.form.value;
    const body = { name, description };

    if (this.isEdit) {
      const data = { ...body, id: this.category.id };
      this.updateCategory(data);
      return;
    }

    this.createCategory(body);
  }

  createCategory(category: any) {
    this.categoryService.postCategory(category).subscribe({
      next: (response: any) => {
        if (response) {
          Swal.fire({
            text: 'Category created successfully',
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
          title: 'Error',
          text:
            err.error.error || err.error.data_error || 'An error has occurred',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  updateCategory(category: any) {
    this.categoryService.putCategory(category).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            text: 'Category updated successfully',
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
          title: 'Error',
          text:
            err.error.error || err.error.data_error || 'An error has occurred',
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
