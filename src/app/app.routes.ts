import { Routes } from '@angular/router';
import { LandingComponent } from './HomePage/landing/landing.component';
import { CallerComponent } from './VideoCall/caller/caller.component';
import { ReciverComponent } from './VideoCall/reciver/reciver.component';
import { SelectSymptomsComponent } from './CreateVideoCall/select-symptoms/select-symptoms.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'caller',
    component: CallerComponent,
  },
  {
    path: 'reciver',
    component: ReciverComponent,
  },
  {
    path: 'selectSymptoms',
    component: SelectSymptomsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
