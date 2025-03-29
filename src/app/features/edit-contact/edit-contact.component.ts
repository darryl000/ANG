import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactForm!: FormGroup;
  contactId!: number;
  successMessage: string = '';
  errorMessage: string = '';



  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));

    this.contactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      photo: [''],
    });

    // Vérification que l'ID est valide avant d'envoyer la requête
    if (!isNaN(this.contactId) && this.contactId > 0) {
      this.contactService.getContactById(this.contactId).subscribe(
        (response) => {
          if (response && response.data) {
            this.contactForm.patchValue(response.data);
          } else {
            console.warn('Aucune donnée trouvée pour ce contact.');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération du contact:', error);
        }
      );
    } else {
      console.error('ID de contact invalide');
    }
  }

  updateContact() {
    if (this.contactForm.valid) {
      this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe(
        () => {
          this.successMessage='Contact mis à jour avec succès !';
          setTimeout(() => {
            this.router.navigate(['/contact']);
          }, 1000);
        },
        (error) => {
          
         this.errorMessage='Erreur lors de la mise à jour du contact:';
        }
      );
    } else {
      alert('Veuillez remplir correctement le formulaire.');
    }
  }
}
