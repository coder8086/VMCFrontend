// live-update.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { interval, Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LiveUpdateService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient){}

     // Helper to build headers with token
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }

  startPolling(intervalTime: number):Observable<any>{
    return interval(intervalTime).pipe(
      switchMap(()=>this.http.get(`${this.baseUrl}/getAllVideoCallings`,{headers:this.getAuthHeaders(), responseType: 'json'}))
    );
  }
 
}
