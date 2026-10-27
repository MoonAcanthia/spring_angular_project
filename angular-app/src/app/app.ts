import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserService} from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit
{
  message: string= '';
  protected readonly title = signal('angular-app');
  constructor(private userService: UserService){}  
  ngOnInit() 
  {
   
  }
}
