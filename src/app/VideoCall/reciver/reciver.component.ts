import { Component, OnInit } from '@angular/core';
import { VideoCallService } from '../../Services/video-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reciver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reciver.component.html',
  styleUrl: './reciver.component.css'
})
export class ReciverComponent implements OnInit {

  callActive: boolean = false;
micOn: boolean = true;
localStream!: MediaStream;
private currentCall: any;


  constructor(public peerService: VideoCallService) {}

  ngOnInit(): void {
  this.peerService.onCall(call => {
    this.currentCall = call;
    this.peerService.getUserMedia().then(stream => {
      this.localStream = stream;
      this.attachVideo('localVideo', stream);
      this.callActive = true;

      call.answer(stream);
      call.on('stream', remoteStream => {
        this.attachVideo('remoteVideo', remoteStream);
      });

      call.on('close', () => {
        this.endCall();
      });
    });
  });
}

toggleMic() {
  if (this.localStream) {
    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      this.micOn = audioTrack.enabled;
    }
  }
}

endCall() {
  if (this.currentCall) {
    this.currentCall.close();
  }

  if (this.localStream) {
    this.localStream.getTracks().forEach(track => track.stop());
  }

  this.callActive = false;

  const remote = document.getElementById('remoteVideo') as HTMLVideoElement;
  const local = document.getElementById('localVideo') as HTMLVideoElement;
  if (remote) remote.srcObject = null;
  if (local) local.srcObject = null;
}

  attachVideo(id: string, stream: MediaStream) {
    const video = document.getElementById(id) as HTMLVideoElement;
    video.srcObject = stream;
    video.play();
  }
}
