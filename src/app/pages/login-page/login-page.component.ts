import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private apiUrl = 'http://localhost:3000/users';
  loginForm: FormGroup;
  errorMessage: string | null = null;
  passwordFieldType: string = 'password';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });


    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  validateForm(): boolean {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email) || !password) {
      this.errorMessage = 'Dados inválidos.';
      return false;
    }

    this.errorMessage = null;
    return true;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    const credentials = this.loginForm.value;

    this.http.get<any[]>(this.apiUrl).subscribe((users) => {
      const user = users.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );
      if (user) {
        this.errorMessage = null;
        this.loginForm.reset();
        this.authService.login(); 
        this.router.navigate(['/homeUser']);
      } else {
        this.errorMessage = 'Dados inválidos.';
      }
    });
  }
}
