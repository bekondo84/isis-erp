import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { from } from 'rxjs';
import { IsisViewComponent } from './core/isis-view/isis-view.component';
import { LoginComponent } from './core/login/login.component';
import { ServiceLocator } from './core/locator.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule ,FormsModule ,CoreModule, AppRoutingModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

   constructor(private injector: Injector){
    ServiceLocator.injector = injector;
   }
}
