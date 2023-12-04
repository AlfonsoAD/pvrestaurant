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
import Swal from 'sweetalert2';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../../interfaces/menu.interface';

@Component({
  selector: 'app-modalm-menu',
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
  templateUrl: './modalm-menu.component.html',
  styleUrl: './modalm-menu.component.scss',
})
export class ModalmMenuComponent {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  isEdit: boolean = false;
  menu!: Menu;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalmMenuComponent>,
    private menuService: MenuService
  ) {
    if (data?.isEdit) {
      this.isEdit = true;
      this.menu = data.menu;
      this.form.patchValue({
        name: this.menu.name,
        description: this.menu.description,
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please, complete all fields',
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
      const data = {
        ...body,
        id: this.menu.id,
        is_active: this.menu.is_active,
      };
      this.editMenu(data);
      return;
    }

    this.createMenu(body);
  }

  createMenu(body: any) {
    this.menuService.postMenu(body).subscribe({
      next: (resp: any) => {
        if (resp) {
          Swal.fire({
            title: 'Success!',
            text: 'Menu created successfully',
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
            err.error.error || err.error.data_error || 'Error to create menu',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  editMenu(body: any) {
    this.menuService.putMenu(body).subscribe({
      next: (resp: any) => {
        if (resp) {
          Swal.fire({
            title: 'Success!',
            text: 'Menu updated successfully',
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
            err.error.error || err.error.data_error || 'Error to update menu',
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
