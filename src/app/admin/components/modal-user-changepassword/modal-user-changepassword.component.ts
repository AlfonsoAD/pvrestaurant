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
import { strongPasswordRegex } from '../../../utils/regexp';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import {
  MatCheckbox,
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

@Component({
  selector: 'app-modal-user-changepassword',
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
    MatCheckboxModule,
  ],
  templateUrl: './modal-user-changepassword.component.html',
  styleUrl: './modal-user-changepassword.component.scss',
})
export class ModalUserChangepasswordComponent {
  form = this.formBuilder.group({
    password: [
      '',
      [Validators.required, Validators.pattern(strongPasswordRegex)],
    ],
    password_confirm: [
      '',
      [Validators.required, Validators.pattern(strongPasswordRegex)],
    ],
  });

  showPassword: boolean = true;
  userId!: number;
  username: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private dialogRef: MatDialogRef<ModalUserChangepasswordComponent>
  ) {
    this.userId = data.userId;
    this.username = data.username;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Please verify the all fields.',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      this.form.markAllAsTouched();
      return;
    }

    const password = this.form.value.password!;
    this.putPassword(password);
  }

  putPassword(password: string) {
    this.userService.putPassword(this.userId, password).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'Password updated',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.dialogRef.close({ ok: true });
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error?.error?.error || 'Error updating password',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
    });
  }

  verifyPasswords() {
    if (
      this.form.value.password &&
      this.form.value.password_confirm &&
      this.form.value.password !== this.form.value.password_confirm
    ) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      this.form.controls.password.markAllAsTouched();
      this.form.controls.password_confirm.markAllAsTouched();
    }
  }

  onChangeShowHidePassword(event: MatCheckboxChange) {
    this.showPassword = event.checked ? false : true;
  }
}
