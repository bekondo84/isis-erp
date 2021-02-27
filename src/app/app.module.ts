import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { from } from 'rxjs';
import { IsisViewComponent } from './core/isis-view/isis-view.component';
import { ServiceLocator } from './core/locator.service';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule ,CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

   constructor(private injector: Injector){
    ServiceLocator.injector = injector;
   }
}
