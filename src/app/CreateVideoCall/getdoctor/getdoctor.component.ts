import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../../Shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../Shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoCallContainer } from '../../Models/video-call-container';
import { VideoCallService } from '../../Services/video-call.service';
import { LiveUpdateService } from '../../Services/liveUpdate/live-update.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-getdoctor',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './getdoctor.component.html',
  styleUrls: ['./getdoctor.component.css']  // <-- fixed typo
})
export class GetdoctorComponent implements OnInit, OnDestroy {

  videoCallings: VideoCallContainer[] = [];
  private subscription!: Subscription;
  private destroy$ = new Subject<void>();  // <-- added destroy$

  constructor(
    private router: Router,
    private videoCallingService: VideoCallService,
    private liveService: LiveUpdateService
  ) {}

  ngOnInit(): void {
    this.subscription = this.liveService.startPolling(1000).subscribe({
      next: (data) => {
        this.videoCallings = data;
      },
      error: (err) => console.error('Error fetching data:', err)
    });
  }

  startVideoCall(link: string): void {
    this.router.navigate(['/caller', link]);
  }

  fetchVideoCallings(): void {
    this.videoCallingService.getAllVideoCallings().subscribe({
      next: (data) => this.videoCallings = data,
      error: (err) => console.error('Error fetching data:', err)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

}
