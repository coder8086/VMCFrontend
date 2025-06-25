import { Component } from '@angular/core';
import { NavbarComponent } from "../../Shared/navbar/navbar/navbar.component";
import { FooterComponent } from '../../Shared/footer/footer.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctor-landing',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './doctor-landing.component.html',
  styleUrl: './doctor-landing.component.css'
})
export class DoctorLandingComponent {

  constructor(private router:Router){}

  RedyForVideoCall(){
    this.router.navigate(['/reciver']);
  }

}
