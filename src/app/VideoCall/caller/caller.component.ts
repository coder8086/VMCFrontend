import { Component, OnInit } from '@angular/core';
import { VideoCallService } from '../../Services/video-call.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoCallContainer } from '../../Models/video-call-container';

@Component({
  selector: 'app-caller',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './caller.component.html',
  styleUrl: './caller.component.css'
})
export class CallerComponent implements OnInit{

  doctorData:VideoCallContainer={
    id: 0,
    doctorName: '',
    doctorId: 0,
    specialization: '',
    experience: '',
    videoLink: '',  
  }
  remotePeerId: string='';
  localStream!: MediaStream;

  callActive: boolean = false;
  micOn: boolean = true;
  private currentCall: any;

  constructor(public peerService: VideoCallService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void { 
    const videoLink = this.route.snapshot.paramMap.get('videoLink');
    if(videoLink){
    this.remotePeerId = videoLink;
    this.fetchDoctorByLink();
    this.callPeer();
    }
  }

   fetchDoctorByLink() {
    this.peerService.getDoctorByLink(this.remotePeerId).subscribe({
      next: (data) => {
        this.doctorData = data;
     
      },
      error: (err) => {
        console.error('Error fetching doctor data:', err);
      
      }
    });
  }

  callPeer() {
    this.peerService.getUserMedia().then(stream => {
      this.localStream = stream;
      this.attachVideo('localVideo', stream);
      this.callActive = true;

      const call = this.peerService.makeCall(this.remotePeerId, stream);
      this.currentCall = call;

      call.on('stream', remoteStream => {
        this.attachVideo('remoteVideo', remoteStream);
      });

      call.on('close', () => {
        this.endCall();
      });
    });
  }

  attachVideo(id: string, stream: MediaStream) {
    const video = document.getElementById(id) as HTMLVideoElement;
    video.srcObject = stream;
    video.play();
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
    this.router.navigate(['/landing']);
    // Clear video elements
    const remote = document.getElementById('remoteVideo') as HTMLVideoElement;
    const local = document.getElementById('localVideo') as HTMLVideoElement;
    if (remote) remote.srcObject = null;
    if (local) local.srcObject = null;
  }
}
