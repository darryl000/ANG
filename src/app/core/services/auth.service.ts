import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface représentant un utilisateur
export interface User {
  email: string;
  password: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root',// Permet à Angular d'injecter ce service dans toute l'application
})
export class AuthService {
  private apiUrl = 'https://www.api.4gul.kanemia.com'; // URL de l'API backend

  constructor(private http: HttpClient) {}

/**
   * Ajoute un nouvel utilisateur à la base de données
   * @param user - Objet contenant les informations de l'utilisateur
   * @returns Observable<User> - Réponse de l'API sous forme d'un Observable
   */

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  
  /**
   * Authentifie un utilisateur en envoyant son email et son mot de passe
   * @param email - Adresse e-mail de l'utilisateur
   * @param password - Mot de passe de l'utilisateur
   * @returns Observable<any> - Réponse contenant le token et l'ID utilisateur
   */

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; userId: string }>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Stocke le token dans le localStorage
          localStorage.setItem('userId', response.userId); // Stocke l'ID utilisateur
          console.log('Connexion réussie'); // Message de confirmation dans la console
        }
      })
    );
  }

/**
   * Déconnecte l'utilisateur en supprimant ses informations du stockage local
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log('Déconnexion réussie');
  }

/**
   * Vérifie si un utilisateur est authentifié
   * @returns boolean - Retourne `true` si un token est présent, sinon `false`
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Récupère l'ID de l'utilisateur connecté
   * @returns string | null - Retourne l'ID utilisateur s'il existe, sinon `null`
   */
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
