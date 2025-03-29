import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService,User } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email = '';
  password = '';
  photo = '';


  constructor(private router: Router, private authService: AuthService) {}
  
  newUser: User = { 
    email: '', 
    password: '', 
    photo: '' 
  }; 

  users: User[] = [];

  // Variable pour afficher le message de succès
  successMessage: string = '';
  errorMessage: string = '';


  navigateTo(path: string): void {
    this.router.navigate([path]);
  }


  createUser(): void {
    this.authService.addUser(this.newUser).subscribe({
      next: (user) => {
        console.log('Utilisateur créé avec succès:', user);
        this.successMessage = 'Inscription réussie. Vous pouvez maintenant vous connecter.';

        this.users.push(user); 
        this.newUser = { email: '',   password: '', photo: '' };
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
      }
    });
  }

}
