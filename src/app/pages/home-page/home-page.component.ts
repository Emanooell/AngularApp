import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Importar FontAwesomeModule corretamente
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSignInAlt,
  faUserPlus,
  faBook,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FontAwesomeModule], // Importar o módulo aqui!
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  // Ícones
  faSignInAlt = faSignInAlt; // Ícone de login
  faUserPlus = faUserPlus; // Ícone de cadastro
  faBook = faBook; // Ícone de livro

  constructor(private router: Router) {}

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  navigateRegister() {
    this.router.navigate(['/register']);
  }
}
