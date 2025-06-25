import { Component } from '@angular/core';
import { DoctorProfile } from '../../../Models/doctor-profile';
import { FormsModule } from '@angular/forms';
import { DoctorProfileService } from '../../../Services/profile/doctor-profile.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent {

  doctorProfile:DoctorProfile = {
  fullName:'',
  gender:'',
  address:'',
  phoneNumber:'',
  profileImage:'', // URL or file path
  specialization:'',
  qualification:'',
  designation:'',
  experience:'',
  }

  constructor(private createProfile:DoctorProfileService, private router: Router){}

  saveProfile(){

    if(
      this.doctorProfile.fullName && this.doctorProfile.address && this.doctorProfile.specialization && this.doctorProfile.experience
    ){

    this.createProfile.createProfile(this.doctorProfile).subscribe({
      next: (response) => {

           alert(response.message);

        this.router.navigate(['']);

      }, 
      error: (error) => {
        console.error("Error while creating profile ", error);
        alert("Faile to creating profile");
      }
    });
    
  }
  else{
    alert("fill out required fields");
  }

  }

  }

