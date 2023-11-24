import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
})
export class FormLoginComponent {
  hello = 'Hello, welcome';
  ready = 'Ready to start?';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        title: 'Error',
        text: 'Form invalid, please check the fields.',
        icon: 'error',
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (this.form.value.email && this.form.value.password) {
      const { email, password } = this.form.value;
      const data = { email, password };
      this.login(data);
    }
  }

  login(body: { email: string; password: string }) {
    this.authService.postLogin(body).subscribe({
      next: (response: Response) => {
        if (response.ok) {
          this.router.navigate(['/dashboard/menu']);
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
    });
  }
}
