import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ContactDetailsComponent } from './features/contact-details/contact-details.component';
import { ContactFormComponent } from './features/contact-form/contact-form.component';
import { EditContactComponent } from './features/edit-contact/edit-contact.component';
import { LogoutComponent } from './auth/logout/logout.component'; // Assurez-vous que ce chemin est correct
import { AddcontactComponent } from './features/addcontact/addcontact.component';
import { RegisterComponent } from './features/register/register.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: 'contact-form', component: AddcontactComponent },
  { path: 'logout', component: LogoutComponent }, 
  { path: 'edit-contact/:id', component: EditContactComponent },
  { path: 'contact', component: ContactFormComponent }, //Ajouterter un contact
 
  // Route ajoutée pour la déconnexion
];
