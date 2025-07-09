import { Routes } from '@angular/router';
import { LandingComponent } from './HomePage/landing/landing.component';
import { CallerComponent } from './VideoCall/caller/caller.component';
import { ReciverComponent } from './VideoCall/reciver/reciver.component';
import { SelectSymptomsComponent } from './CreateVideoCall/select-symptoms/select-symptoms.component';
import { GetdoctorComponent } from './CreateVideoCall/getdoctor/getdoctor.component';
import { DoctorDashboardComponent } from './Dashboards/Doctor/doctor-dashboard/doctor-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { routegardGuard } from './RouteGard/routegard.guard';
import { DoctorLandingComponent } from './HomePage/doctor-landing/doctor-landing.component';
import { DoctorProfileComponent } from './ProfileForms/doctorProfile/doctor-profile/doctor-profile.component';

export const routes: Routes = [
    {
        path:'', redirectTo: 'landing', pathMatch: 'full'
    },
    {
      path:'landing', component:LandingComponent
    },
    {
        path:'caller/:videoLink', component:CallerComponent
    },
    {
        path:'reciver', component:ReciverComponent
    },
    {
        path:'selectSymptoms', component: SelectSymptomsComponent, canActivate:[routegardGuard]
    },
    {
        path:'getDoctor' , component: GetdoctorComponent, canActivate:[routegardGuard]
    },
    {
        path:'doctorDashboard', component: DoctorDashboardComponent
    },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'register', component:SigninComponent
  },
  {
    path: 'doctorLanding',component: DoctorLandingComponent
  },
  {
    path: 'doctorProfile', component:DoctorProfileComponent
  },
  {
    path: 'patientProfile', loadComponent: () => import('./ProfileForms/patientProfile/patient-profile/patient-profile.component').then(m => m.PatientProfileComponent), canActivate:[routegardGuard]
  }
];
