import { Component } from '@angular/core';
import { NavbarComponent } from "../../Shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../Shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getdoctor',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './getdoctor.component.html',
  styleUrl: './getdoctor.component.css'
})
export class GetdoctorComponent {

  doctorList = [
    {
      img:"../../../assets/DoctorPhoto/Dotor1.jpg",
      name: "Dr.Subnis",
      speciality:"General physician"
    }
  ];

  constructor(private router: Router){}
  startVideoCall(){

    this.router.navigate(['/caller']);
  }

}
