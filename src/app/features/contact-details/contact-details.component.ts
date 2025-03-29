import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  imports: [CommonModule,FormsModule,RouterModule,HeaderComponent],
})
export class ContactDetailsComponent implements OnInit {


  contact: any =  null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}


  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.contactService.getContactById(Number(contactId)).subscribe(
        (response) => {
          this.contact = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération du contact:', error);
        }
      );
    }
  }

}
