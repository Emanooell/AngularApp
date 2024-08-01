import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  passwordFieldType: string = 'password'; // Estado para controlar a visibilidade da senha

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });

    // Subscrição para limpar a mensagem de erro ao digitar
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
      this.errorMessage = 'Dados inválidos.'; // Define uma mensagem de erro genérica
      return false;
    }

    this.errorMessage = null; // Limpa a mensagem de erro se tudo estiver válido
    return true;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return; // Mostra a mensagem de erro, se houver
    }

    const credentials = this.loginForm.value;

    this.http.get<any[]>(this.apiUrl).subscribe((users) => {
      const user = users.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );
      if (user) {
        console.log('Login efetuado com sucesso');
        this.errorMessage = null; // Limpa a mensagem de erro se o login for bem-sucedido
        // Aqui você pode adicionar a lógica para redirecionar o usuário ou armazenar o estado de login
      } else {
        this.errorMessage = 'Dados inválidos.'; // Define a mensagem de erro para credenciais inválidas
        console.log('Credenciais inválidas');
      }
      this.loginForm.reset();
    });
  }
}
