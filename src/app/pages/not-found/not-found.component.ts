import { Component } from '@angular/core';
import { Location } from '@angular/common'; // Importar o serviço Location

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'], // Corrigido: styleUrls é um array
})
export class NotFoundComponent {
  constructor(private location: Location) {} // Injetar o serviço Location

  goBack() {
    this.location.back(); // Navegar para a rota anterior
  }
}
