import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Import du RouterModule
import { HeaderComponent } from '../header/header.component';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule, CommonModule, RouterModule, HeaderComponent]
})
export class DashboardComponent implements OnInit {

  contacts: any[] = [];
  totalContacts: number = 0;
  searchTerm: string = ''; 

  constructor(private router: Router,private contactService:ContactService) {}

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
}
