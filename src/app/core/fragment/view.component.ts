import { AfterContentChecked, AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Navigation } from 'src/app/data-model/navigation';
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
 // subscription: Subscription;
  currentNode : Navigation;
  metadata : any ;
  searchFields :Array<any> = [];
  selected: boolean = false ;

  constructor() { 
    this.loader =  ServiceLocator.injector.get(MessageService);
    this.dataModelService = ServiceLocator.injector.get(DataModelService);
    this.sharedService = ServiceLocator.injector.get(SharedService);  
    this.currentNode = this.sharedService.getNavNode();
    this.currentData = this.sharedService.getCurrentData();
    this.loadMetaDataAndDatas();
  }

  private loadMetaDataAndDatas(){
    this.dataModelService.getMetaData(this.currentNode.getType()).toPromise()
    .then(response => {
      this.metadata = response;
      this.sharedService.setMetaData(response);
      this.searchFields = response.fields.filter(f => f.search==true)
                                        .sort((f1,f2) => f1.sequence<=f2.sequence);
      this.loadDatas();

    }).catch(err => {
      console.error(err);
    });
  }

  private loadDatas(){
    let viewMode = this.currentNode.getViewMode().split(',')[0];
    this.dataModelService.getItems(this.currentNode.getType()).toPromise()
                   .then(response => {
                     this.datas = response;                   
                   }).catch(err => {
                     console.error(err);
                   });
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

  formatData(item : any ,fieldname :string){
   
    if(item[fieldname] == null){
      return "";
    }

    if((typeof item[fieldname] === "string") || (typeof item[fieldname] === "number") || (typeof item[fieldname] === "boolean")){
      return item[fieldname];
    } 

  }

  selectAllAction(){
    this.selected = !this.selected;
    this.datas.forEach(item => item.selected = this.selected)
  }

  selectItemAction(item: any){
      this.dataModelService.getItem(this.currentNode.getType(),item.pk).toPromise()
                           .then(response => {
                               this.currentData = response ;
                               this.sharedService.setCurrentData(this.currentData);
                               var data ={"pageType":null,"moduleName":null ,
                               "type":ServiceLocator.typeEvents[1],"action":ServiceLocator.actions[3]
                              };
                              this.sendMessage(data);  
                           }).catch(err => {
                             console.error(err);
                           });
  }

  saveItemAction(){
    console.log("CLICK ON SAVE ACTION");
  }

  cancelAction(){
    var data ={"pageType":null,"moduleName":null ,
        "type":ServiceLocator.typeEvents[1],"action":ServiceLocator.actions[2]
     };
   this.sendMessage(data);   
  }
  
  createItemAction(){     
     let type: string = this.sharedService.getNavNode().getType();
     this.dataModelService.getEmptyInstance(type).toPromise()
           .then(response => {
                this.currentData = response ;
                this.sharedService.setCurrentData(this.currentData);
                console.log("CURRENT DATA : "+JSON.stringify(this.currentData));
                var data ={"pageType":null,"moduleName":null ,
                "type":ServiceLocator.typeEvents[1],"action":ServiceLocator.actions[1]
               };
               this.sendMessage(data);                 
           }).catch(err => {
              console.error(err);
           });
  }

  deleteItemsAction(){
    console.log("CLICK ON DELETE SELECTED ITEMS");
  }

  datas: Array<any> = new Array();
  currentData: any = new Object();
}
