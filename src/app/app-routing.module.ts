import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserprofileupdateComponent } from './userprofileupdate/userprofileupdate.component';
import {RouteGuard} from './route.guard'

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"contactus",component:ContactusComponent},
  {path:"userdashboard",component:UserdashboardComponent,children:[
    {path:"userprofile",component:UserprofileComponent,canActivate:[RouteGuard]},
    {path:"updateprofile",component:UserprofileupdateComponent},
    {path:"",redirectTo:"/userdashboard/userprofile",pathMatch:"full"}
  ]},
  {path:"",redirectTo:"/home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
