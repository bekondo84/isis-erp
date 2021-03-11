import { AfterContentChecked, AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DataModelService } from 'src/app/data-source/data-model.service';
import { SharedService } from 'src/app/data-source/shared.service';
import { FragmentDirective } from '../fragment.directive';
import { ServiceLocator } from '../locator.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'view',
  template: '<div>Bonjour</div>',
  styles: []
})
export class ViewComponent implements OnInit   {  
  
  public loader ;
  dataModelService: DataModelService;
  sharedService: SharedService;

  constructor() { 
    this.loader =  ServiceLocator.injector.get(MessageService);
    this.dataModelService = ServiceLocator.injector.get(DataModelService);
    this.sharedService = ServiceLocator.injector.get(SharedService);
  }

  sendMessage(message:any):void{
    // send message to subscribers via observable subject
    this.loader.sendMessage(message);
  }

clearMessage(): void {
   // clear message
   this.loader.clearMessage();
}

  ngOnInit() {
   
  }

  saveAction(){
    console.log("CLICK ON SAVE ACTION");
  }
  
  createItem(){
     
     let type: string = this.sharedService.getNavNode().getType();
     this.dataModelService.getEmptyInstance(type).toPromise()
           .then(response => {
                this.currentData = response ;
                console.log("CLICK ON CREATE NEW ITEM  :::::: "+JSON.stringify(response));
           }).catch(err => {
              console.error(err);
           });
  }

  deleteSelectedItems(){
    console.log("CLICK ON DELETE SELECTED ITEMS");
  }

  datas: Array<any> = new Array();
  currentData: any = null;
}
