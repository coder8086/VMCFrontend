import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  menuOpen = false;


  isLogin: boolean = false;

ngOnInit(): void {
    const logindata = localStorage.getItem('token');

    if(logindata){
      this.isLogin = true;
    }
}

 constructor(private router: Router){}


 
  goToPage(){
    this.router.navigate(['/login']);
    localStorage.setItem('Role','DOCTOR');
  }

  login(){
    this.router.navigate(['/login']);
    localStorage.setItem('Role','PATIENT');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('Role');
    alert("log out");
    this.isLogin = false;
    this.router.navigate(['/']);
  }

}
