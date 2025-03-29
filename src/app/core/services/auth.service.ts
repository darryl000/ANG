import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  email: string;
  password: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://www.api.4gul.kanemia.com';

  constructor(private http: HttpClient) {}

  // Ajout d'un nouvel utilisateur
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  // Connexion de l'utilisateur
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; userId: string }>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          console.log('Connexion réussie');
        }
      })
    );
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log('Déconnexion réussie');
  }

  // Vérification de l'authentification
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Récupérer l'ID de l'utilisateur connecté
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
