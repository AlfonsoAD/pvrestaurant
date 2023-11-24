import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.validateToken().subscribe({
      next: (response: any) => {
        if (response) {
          this.router.navigate(['/dashboard/menu']);
        } else {
          this.router.navigate(['/']);
        }
      },
    });
  }
}
