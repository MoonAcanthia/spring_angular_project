import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginRequest } from '../../models/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  imports: [ReactiveFormsModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.css'
})
export class PasswordReset 
{
  showPassword = false;
  reg: number=0;
  specialCh: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  constructor(private userService: UserService, private router: Router){}

  userForm :FormGroup = new FormGroup
  ({
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  });
  error=0;
  request: LoginRequest= new LoginRequest;
  doReset()
  {
      const formValue= this.userForm.value;
      if(formValue.password=='')
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
      const token = window.location.href.split("token=")[1];
      this.error = 0;
      this.userService.doReset_Password(token, formValue.password).subscribe(res =>
      {
        this.reg = res;
        if(res == 1)
        {
          this.router.navigate(['/reset-success']);
        }
        else if(res == 3)
        {
          this.error = 8;
        }
      });
  }
}
