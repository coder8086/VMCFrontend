// live-update.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveUpdateService {

  constructor(private zone: NgZone) {}

  getLiveListUpdates(): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource('http://localhost:8080/api/stream', { withCredentials: true });

      eventSource.onmessage = (event) => {
        this.zone.run(() => {
          const data = JSON.parse(event.data);
          observer.next(data);
        });
      };

      eventSource.onerror = (error) => {
        this.zone.run(() => {
          observer.error(error);
        });
        eventSource.close();
      };

      return () => eventSource.close();
    });
  }
}
