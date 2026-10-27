import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})

export class MainPage 
{
 

  username:String=history.state.username;
  data: any[] = [];

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService)
  {
    
  }
  sortOn(column: string) 
  {
    if (this.sortColumn === column)
    {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    else
    {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.data = [...this.data].sort((a, b) =>
    {
      const valA = a[column];
      const valB = b[column];
      const direction = this.sortDirection === 'asc' ? 1 : -1;

      if (typeof valA === 'string' && typeof valB === 'string')
      {
        return valA.localeCompare(valB) * direction;
      }
      if (valA < valB) return -1 * direction;
      if (valA > valB) return 1 * direction;
      return 0;
    });
  }
  
  ngOnInit(): void 
  {
    
    this.userService.doGet_Users().subscribe
     ({
      next:(res) => 
      {
        
        this.data=res;
        console.log("Done");
      }, error:(err) => 
      {
        console.log("Error Received Response: "+err);
      }
    })
  }

}