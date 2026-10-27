import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login 
{
  
  constructor(private userService: UserService, private router:Router){}
  error=0;
  userForm :FormGroup = new FormGroup
  ({

    username: new FormControl(''),
    password: new FormControl('')

  });

  request: LoginRequest= new LoginRequest;

  doLogin()
  {
    const formValue= this.userForm.value;
    
    if(formValue.username=='')
    {
      const element=document.querySelector<HTMLElement>('.mt-1');
      if(element)
      {
        element.style.setProperty("--c", "red");
      }
      return
    }
    else if(formValue.password=='')
    {
      const element=document.querySelector<HTMLElement>('.mt-2');
      if(element)
      {
        element.style.setProperty("--c", "red");
      }
      return
    }
    this.request.username= formValue.username;
    this.request.password= formValue.password;

    this.userService.doLogin(this.request).subscribe
    ({
      next:(res) => 
      {
        document.cookie="token="+res.token+"; max-age=3600; Secure=true";
        this.error=0;
        console.log("Received Response: "+res.token);
        console.log(this.request.username);
        console.log(this.request.password);
        this.router.navigate(['/main-page'],{state:{username:this.request.username}});
      }, error:(err) => 
      {
        this.error=1;
        console.log("Error Received Response: "+err);
        console.log(formValue.username);
        console.log(formValue.password);
        
      }
    })
  }
}
