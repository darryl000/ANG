import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  imports: [HeaderComponent,FormsModule,RouterModule,CommonModule],
})
export class  ContactFormComponent implements OnInit {


  constructor(private router: Router,private contactService:ContactService) {}

  contacts: any[] = [];
  totalContacts: number = 0;
  searchTerm: string = ''; 


   ngOnInit(): void {
    // Récupération de la liste des contacts au chargement du composant
    this.contactService.getContacts().subscribe(
      (contacts) => {
        this.contacts = contacts;
        this.totalContacts = contacts.length; // Mise à jour du nombre total de contacts
      },
      (error) => {
        console.error('Erreur lors de la récupération des contacts:', error);
      }
    );
  }

 // Méthode pour filtrer les contacts en fonction du champ de recherche
   get filteredContacts() {
    return this.contacts?.filter((contact) =>
      `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



// Redirige vers la page de modification d'un contact
  editContact(index: number) {
    this.router.navigate(['/edit-contact', index]); // Redirection vers la modification
  }


  // Redirige vers la page des détails d'un contact
   viewContact(contactId: number) {
    console.log('ID envoyé au détail:', contactId);
    this.router.navigate(['/contact-details', contactId]);
  }


    // Redirige vers la page de mise à jour d'un contact
  pageUpdateContact(contactId:number) {
    this.router.navigate(['/edit-contact',contactId])
  }
 // Suppression d'un contact avec confirmation
  deleteContact(contactId: number) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce contact ?');

    if (confirmation) {
      this.contactService.deleteContact(contactId).subscribe(
        () => {
          // Mise à jour de la liste après suppression
          this.contacts = this.contacts.filter(contact => contact.id !== contactId);
          this.totalContacts = this.contacts.length; // Mise à jour du nombre total de contacts
          alert('Le contact a été supprimé avec succès !');
        },
        (error) => {
          console.error('Erreur lors de la suppression du contact:', error);
          alert('Une erreur s\'est produite lors de la suppression du contact.');
        }
      );
    } else {
      console.log('Suppression annulée.');
    }
  }


  
}
