import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { CoreRoutingModule } from './core-routing.module';
import { DataModelModule } from '../data-model/data-model.module';
import { DataSourceModule } from '../data-source/data-source.module';
import { IsisViewComponent } from './isis-view/isis-view.component';
import { CmsService } from './cms.service';
import { MessageService } from './message.service';
import { from } from 'rxjs';
import { FragmentComponent } from './fragment/fragment.component';
import { ViewComponent } from './fragment/view.component';
import { SanitizeHtmlPipePipe } from './sanitize-html-pipe.pipe';
import { FragmentDirective } from './fragment.directive';
import { SharedService } from '../data-source/shared.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    MatDialogModule,    
    DataModelModule,
    DataSourceModule,
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [IsisViewComponent, ApplicationComponent, FragmentComponent, SanitizeHtmlPipePipe, FragmentDirective, LoginComponent, HomeComponent, ModalComponent],
  providers:[CmsService ,MessageService,SharedService],
  exports: [IsisViewComponent,ApplicationComponent ,FragmentComponent ,LoginComponent,HomeComponent],
  entryComponents: [ModalComponent]
})
export class CoreModule { }
