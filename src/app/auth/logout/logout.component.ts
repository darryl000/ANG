import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `<p>Vous êtes déconnecté. Redirection en cours...</p>`,
  styles: [`p { text-align: center; font-size: 18px; color: #333; }`],
})
export class LogoutComponent {
  constructor(private router: Router) {
    this.logout();
  }

  logout(): void {
    localStorage.removeItem('token'); // Supprime le token
    console.log('Utilisateur déconnecté');
    setTimeout(() => this.router.navigate(['/login']), 2000); // Redirection après 2 secondes
  }
}
