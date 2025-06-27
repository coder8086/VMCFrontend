import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authrequest } from '../../Models/authrequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "https://1jnk6x2b-8080.inc1.devtunnels.ms/api"

  constructor(private http:HttpClient) {}

  login(auth:Authrequest):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,auth,{responseType:'text'});
  }
}
