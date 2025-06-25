import { Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../Models/user';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../Services/auth/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:[RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  user:User ={
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    role:'',
    isProfileCreated:false
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
