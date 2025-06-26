import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../Shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../Shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoCallContainer } from '../../Models/video-call-container';
import { VideoCallService } from '../../Services/video-call.service';

@Component({
  selector: 'app-getdoctor',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './getdoctor.component.html',
  styleUrl: './getdoctor.component.css'
})
export class GetdoctorComponent implements OnInit {

  videoCallings:VideoCallContainer[]=[];

  constructor(private router: Router, private videoCallingService:VideoCallService){}

  ngOnInit(): void {
      this.fetchVideoCallings();
  }

  startVideoCall(link:string){

    this.router.navigate(['/caller', link]);
  }

    fetchVideoCallings(): void {
    this.videoCallingService.getAllVideoCallings().subscribe({
      next: (data) => this.videoCallings = data,
      error: (err) => console.error('Error fetching data:', err)
    });
  }

}
