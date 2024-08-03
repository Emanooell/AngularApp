import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private readonly authKey = 'isAuthenticated';

  constructor() {
    this.isAuthenticated = localStorage.getItem(this.authKey) === 'true';
  }

  login() {
    this.isAuthenticated = true;
    localStorage.setItem(this.authKey, 'true');
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem(this.authKey);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
