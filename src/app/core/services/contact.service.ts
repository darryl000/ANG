import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'; // Assure-toi d'importer map

export interface Contact {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string; }

@Injectable({
  providedIn: 'root', // Fournit ce service dans toute l'application
})
export class ContactService {
  private apiUrl = 'https://www.api.4gul.kanemia.com'; // URL de l'API backend
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Ajoute un contact à la base de données
   * @param contact - Informations du contact à ajouter
   * @returns Observable<Contact> - Réponse de l'API avec le contact ajouté
   */

  addContact(contact: Contact): Observable<Contact> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Aucun token trouvé ! Redirection vers la connexion...');
      this.router.navigate(['/login']); 
      return throwError(() => new Error('Utilisateur non authentifié'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Token invalide, déconnexion...');
          this.logout();
        }
        return throwError(() => new Error('Erreur lors de l\'ajout du contact'));
      })
    );
  }

 /**
   * Récupère tous les contacts de l'utilisateur
   * @returns Observable<Contact[]> - Liste des contacts
   */


  getContacts(): Observable<Contact[]> {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.error('Aucun token trouvé, utilisateur non authentifié.');
      throw new Error('Token manquant');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ data: Contact[] }>(`${this.apiUrl}/contacts`, { headers }).pipe(
      map(response =>{
        console.log('Réponse de l\'API - Contacts:', response); // Affichage de la réponse complète pour débogage
        return response.data;
      }), // Récupère la propriété 'data' contenant les contacts
      catchError((error) => {
        console.error('Erreur lors de la récupération des contacts:', error);
        return throwError(() => new Error('Erreur lors de la récupération des contacts'));
      })
    );
  }

/**
   * Récupère un contact par son ID
   * @param contactId - Identifiant du contact
   * @returns Observable<any> - Détails du contact
   */


  getContactById(contactId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('Aucun token trouvé, utilisateur non authentifié.');
      throw new Error('Token manquant');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<any>(`${this.apiUrl}/contacts/${contactId}`, { headers }).pipe(
      map(response => {
        console.log('Réponse API:', response); // Vérification de la réponse
        return response;
      })
    );
  }
  

/**
   * Met à jour les informations d'un contact
   * @param contactId - Identifiant du contact à mettre à jour
   * @param updatedData - Données mises à jour
   * @returns Observable<any> - Réponse de l'API
   */



  updateContact(contactId: number, updatedData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('Aucun token trouvé, utilisateur non authentifié.');
      throw new Error('Token manquant');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<any>(`${this.apiUrl}/contacts/${contactId}`, updatedData, { headers });
  }

  /**
   * Supprime un contact de la base de données
   * @param contactId - Identifiant du contact à supprimer
   * @returns Observable<void> - Réponse de l'API
   */


  deleteContact(contactId: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Aucun token trouvé, utilisateur non authentifié.');
      throw new Error('Token manquant');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/contacts/${contactId}`, { headers });
  }

/**
   * Déconnecte l'utilisateur en supprimant son token
   */
  
  logout(): void {
    localStorage.removeItem('authToken'); // Supprime le token
    localStorage.clear(); // Supprime toutes les données stockées
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}
