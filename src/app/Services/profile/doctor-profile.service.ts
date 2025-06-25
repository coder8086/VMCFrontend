import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {

    private baseUrl = 'http://localhost:8080/api/createProfile';

  constructor(private http: HttpClient) {}

  createProfile(userData: any):Observable<any> {
   
        const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(this.baseUrl, userData, { headers: headers , responseType: 'json'});
  }
}
