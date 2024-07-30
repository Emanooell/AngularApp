import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  onSubmit(e: Event) {
    e.preventDefault();


    console.log('Cadastro  efetuado');


    const form = e.target as HTMLFormElement;
    form.reset();
  }
}
