import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadComponent } from './components/upload/upload.component';
import { DocumentDetailsComponent } from './components/document-details/document-details.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { 
    path: 'upload', 
    component: UploadComponent, 
    canActivate: [authGuard, roleGuard(['admin', 'editor'])] 
  },
  { 
    path: 'documents/:id', 
    component: DocumentDetailsComponent, 
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '/login' }
];
