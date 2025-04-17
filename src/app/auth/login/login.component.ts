import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../features/header/header.component';
import { AuthService,User } from '../../core/services/auth.service'; // Import du service d'authentification
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,CommonModule, RouterModule,HeaderComponent] // Gestion des formulaires
})


export class LoginComponent {
  
  email: string = '';  // L'email de l'utilisateur
  password: string = '';  // Le mot de passe de l'utilisateur
  errorMessage: string = '';  // Message d'erreur à afficher



  constructor(private router: Router, private authService: AuthService) {}
  
  /**
   * Navigation vers une autre page
   * @param path - Chemin de la route vers laquelle naviguer
   */
 
  navigateTo(path: string): void {
    this.router.navigate([path]); // Utiliser le service Router pour naviguer
  }

/**
   * Gère la soumission du formulaire de connexion
   */

  onSubmit(): void {
    if (this.email && this.password) { // Vérifie si les champs ne sont pas vides
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Connexion réussie', response);
          const token = response.user.token;   // Récupère le token d'authentification
          const user = response.user; // Récupère les informations de l'utilisateur
          if (token) {
            localStorage.setItem('authToken',token); // Stocke le token dans le stockage local
            localStorage.setItem('userId', user.id); // Stocke l'ID de l'utilisateur
            this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord après connexion
          } else {
            console.error('Token manquant dans la réponse');
          }
        },
        (error) => {
          console.error('Erreur de connexion', error);
          this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';  // Affiche un message d'erreur à l'utilisateur
        }
      );
    }
  }
  
  
 
}
