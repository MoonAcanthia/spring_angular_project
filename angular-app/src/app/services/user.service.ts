import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  //register
  doRegister(request: LoginRequest):Observable<number>
  {
    return this.http.post<number>(`${this.apiUrl}/register`,request);
  }

  //auth
  doAuth(token: string)
  {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth`,token);
  }

  //login
  doLogin(request: LoginRequest):Observable<LoginResponse>
  {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,request);
  }

  //remind_password
  doRemind_Password(email: string)
  {
    return this.http.post<void>(`${this.apiUrl}/password`,email);
  }

  //reset_password
  doReset_Password(password_token:String, password:String)
  {
    return this.http.post<number>(`${this.apiUrl}/password_reset`,[password_token,password]);
  }

  //get_users
  doGet_Users()
  {
    return this.http.get<Array<JSON>>(`${this.apiUrl}/getUsers`,{ withCredentials: true });
  }
}
