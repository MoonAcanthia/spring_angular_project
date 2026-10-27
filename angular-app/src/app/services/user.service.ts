import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login-request';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{ 
  constructor(private http: HttpClient) {}  
  //register
  private registerUrl = 'http://localhost:8080/api/register'; 
  doRegister(request: LoginRequest):Observable<number>
  {
    return this.http.post<number>(this.registerUrl,request);
  }
  
  //auth
  private authUrl = 'http://localhost:8080/api/auth';  
  doAuth(token: string)
  { 
    return this.http.post<LoginResponse>(this.authUrl,token);
  }

  //login
  private loginUrl='http://localhost:8080/api/login';
  doLogin(request: LoginRequest):Observable<LoginResponse>
  {
    return this.http.post<LoginResponse>(this.loginUrl,request);
  }

  //remind_password
  private remind_passwordUrl='http://localhost:8080/api/password';
  doRemind_Password(email: String)
  {
    return this.http.post<LoginResponse>(this.remind_passwordUrl,email);
  }
  //reset_password
  private reset_passwordUrl='http://localhost:8080/api/password_reset'
  doReset_Password(password_token:String, password:String)
  {
    return this.http.post<number>(this.reset_passwordUrl,[password_token,password]);
  }

  //get_users
  private getUsersUrl='http://localhost:8080/api/getUsers'
  doGet_Users()
  {
    return this.http.get<Array<JSON>>(this.getUsersUrl,{ withCredentials: true });
  }
}
