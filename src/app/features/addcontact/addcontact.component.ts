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
  
  user_id: number | null = null;
  first_name = '';
  last_name = '';
  email = '';
  phone = '';
  photo = '';


  successMessage = '';
  errorMessage = '';

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    const storageUserId = localStorage.getItem('userId');
    console.log("user",storageUserId)

    if (storageUserId) {
      this.user_id = Number(storageUserId); 
    }

    if (!this.user_id) {
      this.router.navigate(['/login']);  
    }
  }
  
  

  addContact(): void {
    if (!this.first_name || !this.last_name || !this.email || !this.phone) {
      this.errorMessage = "Tous les champs sont obligatoires !";
      return;
    }

    const newContact: Contact = {
      user_id: this.user_id!,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      photo: this.photo
    };
    console.log("Envoi des données au service :", newContact);

    this.contactService.addContact(newContact).subscribe({
      next: (response) => {
        console.log('Contact ajouté avec succès:', response);
        this.successMessage = 'Contact ajouté avec succès !';
        this.router.navigate(['/contact']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du contact:', err);
        this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
      }
    });
  }
}
