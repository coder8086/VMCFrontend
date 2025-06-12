import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

   private peer: Peer;
  public myPeerId: string = '';
  private mediaConnection?: MediaConnection;

  constructor() {
    this.peer = new Peer();
    this.peer.on('open', id => {
      this.myPeerId = id;
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

}
