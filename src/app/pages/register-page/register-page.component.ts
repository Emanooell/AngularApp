import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private apiUrl = 'http://localhost:3000/users';
  registerForm: FormGroup;
  errorMessage: string | null = null;
  passwordFieldType: string = 'password';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }


  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    const user = this.registerForm.value;

    this.http.post(this.apiUrl, user).subscribe({
      next: (response) => {
        console.log('Usuário cadastrado', response);
        this.errorMessage = null;
        this.registerForm.reset();
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário', error);
        this.errorMessage = 'Ocorreu um erro ao cadastrar o usuário.';
      },
    });
  }

  validateForm() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    if (!email) {
      this.errorMessage = 'Email é obrigatório.';
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      this.errorMessage = 'Email inválido.';
      return false;
    }

    if (!password) {
      this.errorMessage = 'Senha é obrigatória.';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'Senha deve ter no mínimo 6 caracteres.';
      return false;
    }

    this.errorMessage = null;
    return true;
  }
}
