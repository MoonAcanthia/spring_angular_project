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
  request: String= new String;
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
    this.request=formValue.username;
    this.userService.doRemind_Password(this.request).subscribe ({
      next:(res) => 
      {
        console.log("Received Response: "+res.token);
      }, error:(err) => 
      {
        console.log("Error Received Response: "+err);
      }
    })
    this.router.navigate(['/password-send']);
  }
}
