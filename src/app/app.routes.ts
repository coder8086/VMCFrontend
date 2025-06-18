import { Routes } from '@angular/router';
import { LandingComponent } from './HomePage/landing/landing.component';
import { CallerComponent } from './VideoCall/caller/caller.component';
import { ReciverComponent } from './VideoCall/reciver/reciver.component';
import { SelectSymptomsComponent } from './CreateVideoCall/select-symptoms/select-symptoms.component';
import { GetdoctorComponent } from './CreateVideoCall/getdoctor/getdoctor.component';
import { DoctorDashboardComponent } from './Dashboards/Doctor/doctor-dashboard/doctor-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {
        path:'', component:LandingComponent
    },
    {
        path:'caller', component:CallerComponent
    },
    {
        path:'reciver', component:ReciverComponent
    },
    {
        path:'selectSymptoms', component: SelectSymptomsComponent
    },
    {
        path:'getDoctor' , component: GetdoctorComponent
    },
    {
        path:'doctorDashboard', component: DoctorDashboardComponent
    },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'register', component:RegisterComponent
  }
];
