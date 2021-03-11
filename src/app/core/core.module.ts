import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  imports: [
    DataModelModule,
    DataSourceModule,
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [IsisViewComponent, FragmentComponent, SanitizeHtmlPipePipe, FragmentDirective],
  providers:[CmsService ,MessageService,SharedService],
  exports: [IsisViewComponent ,FragmentComponent]
})
export class CoreModule { }
