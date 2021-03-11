import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { PageCmsService } from './page-cms.service';
import { ThemeCmsService } from './theme-cms.service';
import { FragmentService } from './fragment.service';
import { DataModelService } from './data-model.service';
  

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule
  ],
  declarations: [],
  providers: [ConfigService ,PageCmsService ,ThemeCmsService ,FragmentService ,DataModelService]
})
export class DataSourceModule { }
