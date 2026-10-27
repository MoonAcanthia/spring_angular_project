import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import {Register} from './components/register/register'
import { Auth } from './components/auth/auth';
import { AccountCreated } from './components/account-created/account-created';
import { MainPage } from './components/main-page/main-page';
import { RemindPassword } from './components/remind-password/remind-password';
import { PasswordSend } from './components/password-send/password-send';
import { PasswordReset } from './components/password-reset/password-reset';
import { ResetSuccess } from './components/reset-success/reset-success';

export const routes: Routes = 
[
    {path:'',redirectTo:"login",pathMatch:"full"},
    {path:'login',component: Login},
    {path:'register', component: Register},
    {path: 'auth', component: Auth},
    {path: 'remind-password',component: RemindPassword},
    {path: 'account-created', component: AccountCreated},
    {path: 'main-page',component: MainPage},
    {path: 'password-send',component:PasswordSend},
    {path: 'password-reset',component:PasswordReset},
    {path: 'reset-success',component:ResetSuccess}
];
