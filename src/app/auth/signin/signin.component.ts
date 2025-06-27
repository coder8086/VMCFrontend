import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../Services/auth/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{

  user:User ={
      firstName:'',
      lastName:'',
      username:'',
      password:'',
      role:'',
      isProfileCreated:false,
    }

    ngOnInit(): void {
        const storedRole = localStorage.getItem('Role');
        if(storedRole){
          this.user.role = storedRole;
        }
    }
  
    constructor(private router:Router, private authService:RegisterService){}
  
    signin(){
  
        if(
        this.user.firstName && this.user.lastName && this.user.username && this.user.password
      ){
        
  
      this.authService.register(this.user).subscribe({
        next: (response) => {
          alert(response.message);
          this.router.navigate(['/login']);
      
  
        },
        error: (error) => {
          console.error('Error during signup:', error);
          alert(error.error?.message || 'Signup failed.');
        },
      });
    }else{
  
      alert('please fill required fields ');
    }
  
    }

}
