import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../Shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../Shared/footer/footer.component";


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit{

  isLogin:boolean = false;

constructor(private router:Router){}

ngOnInit(): void {
    const loginToken = localStorage.getItem('token');

    if(loginToken){
      this.isLogin=true;
    }
}

startVideoCall(){

if(this.isLogin){

  this.router.navigate(['/selectSymptoms']);

}else{

  this.router.navigate(['/login']);

  localStorage.setItem('Role','PATIENT');
}

  
}

joinVideoCall(){

  this.router.navigate(['/reciver']);
}

}
