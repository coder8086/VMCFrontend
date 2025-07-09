import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../Services/profile/patient.service';
import { PatientDetails } from '../../../Models/patient-details';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent {

   patientForm: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      cityState: ['', Validators.required],
      emergencyContact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required]
    });
  }

  

 onSubmit() {
    if (this.patientForm.valid) {
      const patientDetails: PatientDetails = this.patientForm.value;

      this.patientService.savePatientDetails(patientDetails).subscribe({
        next: (response) => {
          console.log('Patient saved:', response);
          alert('Patient data saved successfully!');
          this.patientForm.reset();
        },
        error: (err) => {
          console.error('Error saving patient:', err);
          alert('Failed to save patient data.');
        }
      });
    }
  }

}
