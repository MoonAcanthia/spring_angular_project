import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit
{
  constructor(private userService: UserService, private router: Router){}
  ngOnInit(): void 
  {
    const str: string = window.location.href;
    console.log(str);
    const result: string[] = str.split("auth_token=");
    console.log(result[1]);
    this.userService.doAuth(result[1]).subscribe
    ({
      next:(res) => 
      {
       
        console.log("Done");
      }, error:(err) => 
      {
        console.log("Error Received Response: "+err);
      }
    })
  }
  redirect()
  {
    this.router.navigate(['/login']);
  }
}

