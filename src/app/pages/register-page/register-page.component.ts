import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [HttpClientModule], // Adicionar HttpClientModule aqui
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  onSubmit(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value;

    const user = { email, password };

    this.http.post(this.apiUrl, user).subscribe((response) => {
      console.log('Usuário cadastrado', response);
      form.reset();
    });
  }
}
