import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientDetails } from '../../Models/patient-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http:HttpClient) { }

     // Helper to build headers with token
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }

  savePatientDetails(patientDetails:PatientDetails): Observable<any> {
    return this.http.post<PatientDetails>(`${this.baseUrl}/addPatient`, patientDetails,{headers: this.getAuthHeaders(), responseType: 'json'});
  }
}
