import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remind-password',
  imports: [ReactiveFormsModule],
  templateUrl: './remind-password.html',
  styleUrl: './remind-password.css'
})
export class RemindPassword
{
  constructor(private userService: UserService, private router: Router){}
  userForm : FormGroup = new FormGroup
  ({
    username: new FormControl('')
  });
  sending = false;
  sendError = false;

  doRemind()
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
    this.sending = true;
    this.sendError = false;
    this.userService.doRemind_Password(formValue.username).subscribe({
      next: () =>
      {
        this.router.navigate(['/password-send']);
      },
      error: (err) =>
      {
        console.error("Remind password failed", err);
        this.sending = false;
        this.sendError = true;
      }
    });
  }
}
