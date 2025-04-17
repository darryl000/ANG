import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, Contact } from '../../core/services/contact.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-addcontact',
  standalone: true, 
  imports: [CommonModule, FormsModule,HeaderComponent],
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {
 // Définition des propriétés du formulaire
  user_id: number | null = null; // ID de l'utilisateur (récupéré depuis le localStorage)
  first_name = ''; // Prénom du contact
  last_name = ''; // Nom du contact
  email = ''; // Email du contact
  phone = '';
  photo = '';

// Messages d'information
  successMessage = ''; // Message de succès
  errorMessage = '';  // Message d'erreur


  constructor(private contactService: ContactService, private router: Router) {}

  /**
   * Exécuté à l'initialisation du composant
   */

  ngOnInit(): void {
    const storageUserId = localStorage.getItem('userId');  // Récupération de l'ID utilisateur dans le stockage local
    console.log("user",storageUserId)

    if (storageUserId) {
      this.user_id = Number(storageUserId); // Conversion en nombre
    }

    // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
    if (!this.user_id) {
      this.router.navigate(['/login']);  
    }
  }
  
  
/**
   * Ajoute un nouveau contact
   */
  addContact(): void {
    if (!this.first_name || !this.last_name || !this.email || !this.phone) {
      this.errorMessage = "Tous les champs sont obligatoires !";
      return;
    }
 // Création d'un objet Contact à envoyer au service
    const newContact: Contact = {
      user_id: this.user_id!, // "!" pour indiquer que la valeur ne peut pas être null
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      photo: this.photo
    };
    console.log("Envoi des données au service :", newContact);

    // Appel du service pour ajouter le contact
    this.contactService.addContact(newContact).subscribe({
      next: (response) => {
        console.log('Contact ajouté avec succès:', response);
        this.successMessage = 'Contact ajouté avec succès !';
        this.router.navigate(['/contact']); // Redirection vers la liste des contacts
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du contact:', err);
        this.errorMessage = 'Une erreur est survenue, veuillez réessayer.'; // Affichage du message d'erreur
      }
    });
  }
}
