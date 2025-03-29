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
    this.contactService.getContacts().subscribe(
      (contacts) => {
        this.contacts = contacts;
        this.totalContacts = contacts.length; // Calculer le nombre de contacts
      },
      (error) => {
        console.error('Erreur lors de la récupération des contacts:', error);
      }
    );
  }

 
   get filteredContacts() {
    return this.contacts?.filter((contact) =>
      `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }




  editContact(index: number) {
    this.router.navigate(['/edit-contact', index]); // Redirection vers la modification
  }


   // code qui renvoie vers la page de visualition des details d'un utilisateurs
   viewContact(contactId: number) {
    console.log('ID envoyé au détail:', contactId);
    this.router.navigate(['/contact-details', contactId]);
  }


   // code qui renvoie vers la page de  modification   d'un utilisateurs
  pageUpdateContact(contactId:number) {
    this.router.navigate(['/edit-contact',contactId])
  }

  deleteContact(contactId: number) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce contact ?');

    if (confirmation) {
      this.contactService.deleteContact(contactId).subscribe(
        () => {
          this.contacts = this.contacts.filter(contact => contact.id !== contactId);
          this.totalContacts = this.contacts.length; // Mettre à jour le nombre de contacts
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
