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
  
  
 
  navigateTo(path: string): void {
    this.router.navigate([path]); // Utiliser le service Router pour naviguer
  }


  // Fonction pour créer un utilisateur
  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Connexion réussie', response);
          const token = response.user.token; 
          const user = response.user;
          if (token) {
            localStorage.setItem('authToken',token); 
            localStorage.setItem('userId', user.id); 
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Token manquant dans la réponse');
          }
        },
        (error) => {
          console.error('Erreur de connexion', error);
          this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';  // Affichage d'un message d'erreur
        }
      );
    }
  }
  
  
 
}
