import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../Shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../Shared/footer/footer.component";


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

constructor(private router:Router){}

startVideoCall(){

  this.router.navigate(['/selectSymptoms']);
}

joinVideoCall(){

  this.router.navigate(['/reciver']);
}

}
