import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-account-created',
  imports: [],
  templateUrl: './account-created.html',
  styleUrl: './account-created.css'
})
export class AccountCreated 
{
    constructor(private router: Router){}
    redirect()
    {
       this.router.navigate(['/login']);
    }
}
