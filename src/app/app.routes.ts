import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

export const routes: Routes = [
    {path: '', component:HomePageComponent},
    { path: 'login', component: LoginPageComponent },
    {path:'register', component:RegisterPageComponent},
    {path:'homeUser', component:UserHomeComponent}
];
