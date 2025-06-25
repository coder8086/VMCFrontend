import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../Models/user';
import { Authrequest } from '../../Models/authrequest';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Services/auth/login.service';
import { GetUserService } from '../../Services/auth/get-user.service';


@Component({
  selector: 'app-login',
   standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  auth:Authrequest={
    username:'',
    password:''
  }

  constructor(private authService:LoginService,private getUser:GetUserService, private router:Router){
  }

  login(){

   
    if (this.auth.username && this.auth.password) {
      this.authService.login(this.auth).subscribe({
        next: (res: string) => {
  alert('Login Successful!');
  localStorage.setItem('token', res); // `res` is already the token string
  this.fetchUser();
},
        error: (error) => {
          console.error('Login failed:', error);
          alert('Invalid credentials, please try again.');
        }
      });

    } 
    else
     {
      alert('Please fill in all fields.');
    }
    
  }

    fetchUser(): void {
    this.getUser.getUserById().subscribe({
      next: (data) => {
        
        localStorage.setItem('firstName',data.firstName);
     

      switch(data.role){
        case "DOCTOR": 
          if(data.isProfileCreated){
            this.router.navigate(['/doctorLanding']);
          }else{
            this.router.navigate(['/doctorProfile']);
          }
        break;
        
        case "PATIENT":
          this.router.navigate(['']);
        break;
        
        default:
          console.log("Invalid role");
        break;

      }

      },
      error: (err) => {
      console.log("fail to get user "+err);
      }
    });
  }

}
