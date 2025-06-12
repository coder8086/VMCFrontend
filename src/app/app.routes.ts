import { Routes } from '@angular/router';
import { LandingComponent } from './HomePage/landing/landing.component';
import { CallerComponent } from './VideoCall/caller/caller.component';
import { ReciverComponent } from './VideoCall/reciver/reciver.component';

export const routes: Routes = [
    {
        path:'', component:LandingComponent
    },
    {
        path:'caller', component:CallerComponent
    },
    {
        path:'reciver', component:ReciverComponent
    }
];
