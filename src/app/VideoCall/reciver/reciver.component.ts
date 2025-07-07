import { Component, OnInit } from '@angular/core';
import { VideoCallService } from '../../Services/video-call.service';
import { CommonModule } from '@angular/common';
import { GetUserService } from '../../Services/auth/get-user.service';
import { HttpClient } from '@angular/common/http';
import { DoctorProfile } from '../../Models/doctor-profile';
import { VideoCallContainer } from '../../Models/video-call-container';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reciver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reciver.component.html',
  styleUrl: './reciver.component.css'
})
export class ReciverComponent implements OnInit {


  myDoctor: DoctorProfile = {
    fullName: '',
    gender: '',
    address: '',
    phoneNumber: '',
    profileImage: '', // URL or file path
    specialization: '',
    qualification: '',
    designation: '',
    experience: '',
  }

  videoCallContainer: VideoCallContainer = {
    id: 0,
    doctorName: '',
    doctorId: 0,
    specialization: '',
    experience: '',
    videoLink: ''
  }

  callActive: boolean = false;
  micOn: boolean = true;
  localStream!: MediaStream;
  private currentCall: any;

  peerid: string = '';




  constructor(public peerService: VideoCallService, private getUser: GetUserService, private http: HttpClient, private addToCantainer: VideoCallService, private delCall: VideoCallService,private router:Router) { }

  ngOnInit(): void {

    this.fetchUser();

    const checkPeerReady = setInterval(() => {

      const genPeerId = this.peerService.getPeerId();

      if (genPeerId) {

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

  saveLink() {

    this.videoCallContainer.doctorName = this.myDoctor.fullName;
    this.videoCallContainer.specialization = this.myDoctor.specialization;
    this.videoCallContainer.experience = this.myDoctor.experience;
    this.videoCallContainer.videoLink = this.peerid;

    this.addToCantainer.createVideoCall(this.videoCallContainer).subscribe({
      next: (res) => {
        console.log("Video details added to container");
      },
      error: (er) => {
        console.log("adding to container error", er);
      }
    });

  }

  fetchUser() {

    this.http.get<any>("http://localhost:8080/api/doctor/by-user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }, responseType: 'json'
    }).subscribe({
      next: (doctor) => {
        this.myDoctor = doctor;
        console.log("link id", doctor.id);
        this.videoCallContainer.doctorId = doctor.id;
      }, error: (er) => {

      }
    });
  }

  clearCall() {
    this.delCall.deleteVideoCalling(this.videoCallContainer.doctorId).subscribe(
      {
        next: (resp) => {
          console.log(resp);
          this.router.navigate(['/doctorLanding'])
        }, error: (err) => {

          console.log("link delete error ", err)

        }
      }
    );

  }


}
