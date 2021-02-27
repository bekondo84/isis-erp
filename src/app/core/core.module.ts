import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { DataModelModule } from '../data-model/data-model.module';
import { DataSourceModule } from '../data-source/data-source.module';
import { IsisViewComponent } from './isis-view/isis-view.component';
import { CmsService } from './cms.service';
import { MessageService } from './message.service';
import { from } from 'rxjs';

@NgModule({
  imports: [
    DataModelModule,
    DataSourceModule,
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [IsisViewComponent],
  providers:[CmsService ,MessageService],
  exports: [IsisViewComponent]
})
export class CoreModule { }
