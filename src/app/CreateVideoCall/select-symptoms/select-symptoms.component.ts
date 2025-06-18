import { Component } from '@angular/core';
import { NavbarComponent } from "../../Shared/navbar/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../Shared/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-symptoms',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './select-symptoms.component.html',
  styleUrl: './select-symptoms.component.css'
})
export class SelectSymptomsComponent {

  symptomsList = [
     { name: 'Fever', icon: '🌡️' },
  { name: 'Cough', icon: '🤧' },
  { name: 'Shortness of Breath', icon: '😮‍💨' },
  { name: 'Fatigue', icon: '😴' },
  { name: 'Headache', icon: '🤕' },
  { name: 'Sore Throat', icon: '😫' },
  { name: 'Runny Nose', icon: '🤧' },
  { name: 'Muscle Pain', icon: '💪' },
  { name: 'Loss of Taste', icon: '👅' },
  { name: 'Loss of Smell', icon: '👃' },
  { name: 'Nausea', icon: '🤢' },
  { name: 'Vomiting', icon: '🤮' },
  { name: 'Diarrhea', icon: '🚽' },
  { name: 'Chest Pain', icon: '❤️‍🔥' },
  { name: 'Abdominal Pain', icon: '🤰' },
  { name: 'Dizziness', icon: '😵' },
  { name: 'Skin Rash', icon: '🤕' },
  { name: 'Chills', icon: '🥶' },
  { name: 'Joint Pain', icon: '🦴' },
  { name: 'Swelling', icon: '🦶' }
  ];

  constructor(private router: Router){}

  GetDoctor(){
    this.router.navigate(['/getDoctor']);
  }

}
