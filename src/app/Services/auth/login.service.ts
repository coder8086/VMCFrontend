import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authrequest } from '../../Models/authrequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "http://localhost:8080/api"

  constructor(private http:HttpClient) {}

  login(auth:Authrequest):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,auth,{responseType:'text'});
  }
}
