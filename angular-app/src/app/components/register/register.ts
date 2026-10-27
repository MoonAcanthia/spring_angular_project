import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginRequest } from '../../models/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register 
{
  reg: number=0;
  specialCh: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  constructor(private userService: UserService, private router: Router){}

  userForm :FormGroup = new FormGroup
  ({

    username: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  });
  error=0;
  request: LoginRequest= new LoginRequest;
  doRegister()
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
      else if(formValue.password.length<8)
      {
        this.error=1;
        return
      }
      else if(formValue.password.length>20)
      {
        this.error=2;
        return
      }
      else if(!/[a-z]/.test(formValue.password))
      {
        this.error=3;
        return;
      }
      else if(!/[A-Z]/.test(formValue.password))
      {
        this.error=4;
        return;
      }
      else if(!this.specialCh.test(formValue.password))
      {
        this.error=5;
        return;
      }
      else if(!/\d/.test(formValue.password))
      {
        this.error=6;
        return;
      }
      else if(formValue.repeatPassword=='')
      {
        const element=document.querySelector<HTMLElement>('.mt-3');
        if(element)
        {
          element.style.setProperty("--c", "red");
        }
        return
      }
      else if(formValue.password!=formValue.repeatPassword)
      {
        this.error=7;
        return
      }
      this.request.username= formValue.username;
      this.request.password= formValue.password;
      this.userService.doRegister(this.request).subscribe
      (
         res => 
        {
          this.reg=res;
        }
      )
      if(this.reg==0)
      {
        this.router.navigate(['/account-created']);
      }
  }
}
