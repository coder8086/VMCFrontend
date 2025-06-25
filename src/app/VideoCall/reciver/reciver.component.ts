import { Component, OnInit } from '@angular/core';
import { VideoCallService } from '../../Services/video-call.service';
import { CommonModule } from '@angular/common';
import { GetUserService } from '../../Services/auth/get-user.service';

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

peerid:string = '';




  constructor(public peerService: VideoCallService,private getUser: GetUserService) {}

  ngOnInit(): void {


    const checkPeerReady = setInterval(() => {

    const genPeerId = this.peerService.getPeerId();

    if(genPeerId){

      this.peerid = genPeerId;
       clearInterval(checkPeerReady);
       this.saveLink(); 
    }

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

  }, 500);
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

  saveLink(){

    this.fetchUser();

  }

      fetchUser(): void {
    this.getUser.getUserById().subscribe({
      next: (data) => {
        
        localStorage.setItem('firstName',data.firstName);

        alert(data.firstName);
      },
      error: (err) => {
      console.log("fail to get user "+err);
      }
    });
  }
}
