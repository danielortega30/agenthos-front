import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
    canActivate: [publicGuard],
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./features/doctors/doctor-list/doctor-list.component').then(
        (m) => m.DoctorListComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'doctors/new',
    loadComponent: () =>
      import('./features/doctors/doctor-form/doctor-form.component').then(
        (m) => m.DoctorFormComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'doctors/:id/edit',
    loadComponent: () =>
      import('./features/doctors/doctor-form/doctor-form.component').then(
        (m) => m.DoctorFormComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'doctors/:doctorId/patients',
    loadComponent: () =>
      import('./features/patients/patient-list/patient-list.component').then(
        (m) => m.PatientListComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'patients',
    loadComponent: () =>
      import('./features/patients/patient-list/patient-list.component').then(
        (m) => m.PatientListComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'patients/new',
    loadComponent: () =>
      import('./features/patients/patient-form/patient-form.component').then(
        (m) => m.PatientFormComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'patients/:id/edit',
    loadComponent: () =>
      import('./features/patients/patient-form/patient-form.component').then(
        (m) => m.PatientFormComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'doctors',
    pathMatch: 'full',
  },
];
