import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  onSubmit(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password =  (form.elements.namedItem('password') as HTMLInputElement).value;

    this.http.get<any[]>(this.apiUrl).subscribe((users) => {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        console.log('Login efetuado com sucesso');
        // Aqui você pode adicionar a lógica para redirecionar o usuário ou armazenar o estado de login
      } else {
        console.log('Credenciais inválidas');
      }
      form.reset();
    });
  }
}
