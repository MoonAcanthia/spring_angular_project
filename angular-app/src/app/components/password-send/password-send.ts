import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-password-send',
  imports: [],
  templateUrl: './password-send.html',
  styleUrl: './password-send.css'
})
export class PasswordSend 
{

   constructor(private router: Router){}
    redirect()
    {
       this.router.navigate(['/login']);
    }
}
