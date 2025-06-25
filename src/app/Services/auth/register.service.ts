import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    private baseUrl = "http://localhost:8080/api";


  constructor(private http:HttpClient) {}

  register(user:User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, { responseType: 'json' });
  }
}
