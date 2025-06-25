import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http:HttpClient) { }

   getUserById(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<User>(`${this.baseUrl}/getUserById`, { headers });
  }


}
