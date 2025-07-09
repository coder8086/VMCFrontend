import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VideoCallContainer } from '../Models/video-call-container';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

   private baseUrl = "http://localhost:8080/api";

   private peer: Peer;
  public myPeerId: string = '';
  private mediaConnection?: MediaConnection;

  constructor(private http:HttpClient) {
    this.peer = new Peer();
    this.peer.on('open', id => {
      this.myPeerId = id;
    });
  }

    // Helper to build headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getPeerId(): string {
    return this.myPeerId;
  }

  onCall(callback: (call: MediaConnection) => void) {
    this.peer.on('call', callback);
  }

  makeCall(peerId: string, stream: MediaStream): MediaConnection {
    this.mediaConnection = this.peer.call(peerId, stream);
    return this.mediaConnection;
  }

getUserMedia() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  } else {
    console.error('Media Devices API not supported!');
    return Promise.reject('Media Devices API not supported!');
  }
}

  createVideoCall(videoCallContainer:VideoCallContainer): Observable<any> {
    return this.http.post(`${this.baseUrl}/setVideoLink`, videoCallContainer, { headers: this.getAuthHeaders(), responseType: 'json' });
  }

    getAllVideoCallings(): Observable<VideoCallContainer[]> {


    return this.http.get<VideoCallContainer[]>(`${this.baseUrl}/getAllVideoCallings`, { headers :this.getAuthHeaders() });
  }

  // Get doctor by video link
  getDoctorByLink(videoLink: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getDoctorByLink/${videoLink}`,{headers: this.getAuthHeaders()});
  }

    // Delete video calling by ID with token
  deleteVideoCalling(doctorId: number) {
    return this.http.delete(`${this.baseUrl}/deleteVideoCalling/${doctorId}`, {
      headers: this.getAuthHeaders()
    });
  }

}
