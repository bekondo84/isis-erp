import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { ApplicationComponent } from './core/application/application.component';

const routes :Routes =[
   {path:"" , component:HomeComponent},
   {path:"login" , component: LoginComponent},
   {path:":extension" , component: ApplicationComponent},
   //{path:":extension/:type" ,component: ApplicationComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
