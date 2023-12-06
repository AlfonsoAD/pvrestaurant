import { Component, Inject, OnInit } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { strongPasswordRegex } from '../../../utils/regexp';
import { UsersService } from '../../services/users.service';
import { ListUser } from '../../../interfaces/user.interface';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

@Component({
  selector: 'app-modal-user',
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
    MatCheckboxModule,
  ],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.scss',
})
export class ModalUserComponent implements OnInit {
  form = this.formBuilder.group({
    first_name: [''],
    last_name: [''],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(strongPasswordRegex)],
    ],
    password_confirm: [
      '',
      [Validators.required, Validators.pattern(strongPasswordRegex)],
    ],
    roles: ['', [Validators.required]],
  });

  picture: string = '';
  isEdit: boolean = false;
  user!: ListUser;
  roles: string[] = ['Administrator', 'Cashier', 'Waiter'];
  convertedRoles: { [key: string]: string } = {
    Administrator: 'admin',
    Cashier: 'cashier',
    Waiter: 'waiter',
  };

  convertedRolesReverse: { [key: string]: string } = {
    admin: 'Administrator',
    cashier: 'Cashier',
    waiter: 'Waiter',
  };

  showPassword: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private dialogRef: MatDialogRef<ModalUserComponent>
  ) {
    if (data && data?.edit) {
      this.isEdit = true;
      this.user = data.user;
      this.form.patchValue({
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        username: this.user.username,
        email: this.user.email,
        roles: this.convertedRolesReverse[this.user.roles[0]],
      });
    }
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.form.controls.password.clearValidators();
      this.form.controls.password_confirm.clearValidators();
      this.form.controls.password.updateValueAndValidity();
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill all the required fields or verify the passwords',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.value.password !== this.form.value.password_confirm) {
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
      return;
    }

    const body = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      roles: [this.convertedRoles[this.form.value.roles!]],
    };

    if (this.isEdit) {
      this.editUser({ ...body, id: this.user.id });
      return;
    }

    this.createUser(body);
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

  createUser(user: any) {
    this.userService.postUser(user, this.picture).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'User created successfully',
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
          text:
            error.error.error ||
            error.error.data_error ||
            'An error has occurred',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
    });
  }

  editUser(user: any) {
    this.userService.putUser(user, this.picture).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'User edited successfully',
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
          text:
            error.error.error ||
            error.error.data_error ||
            'An error has occurred',
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
