import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Import du RouterModule

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDropdownOpen = false; // Gère l'état du menu déroulant
  constructor(private router: Router) {}
  
  
  menuItems = [
    { path: '/contact-form', label: 'Ajout contact' },
    { path: '/contact', label: '  Mes Contacts' },
  ];
  
  
  navigateTo(route: string, event?: Event):void {
    if (event) {
      event.preventDefault(); // Empêche le rechargement de la page
    }
    this.router.navigate([route]);
    this.isDropdownOpen = false; // Ferme le menu après un clic
  }
  

  toggleDropdown(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page
    this.isDropdownOpen = !this.isDropdownOpen; // Bascule l'état
  }
  

  
  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.clear(); 
    console.log('Utilisateur déconnecté');
    this.router.navigate(['/login']);
  }
}
