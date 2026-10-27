import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-reset-success',
  imports: [],
  templateUrl: './reset-success.html',
  styleUrl: './reset-success.css'
})
export class ResetSuccess 
{
  constructor(private router: Router){}
    redirect()
    {
       this.router.navigate(['/login']);
    }
}
