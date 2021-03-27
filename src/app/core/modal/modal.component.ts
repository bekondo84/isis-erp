import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactory, ComponentRef, ElementRef, Inject, ModuleWithComponentFactories, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Fragmentcms } from 'src/app/data-model/fragmentcms';
import { Navigation } from 'src/app/data-model/navigation';
import { ModuleService } from 'src/app/data-source/module.service';
import { SharedService } from 'src/app/data-source/shared.service';
import { CmsService } from '../cms.service';
import { FragmentDirective } from '../fragment.directive';
import { ServiceLocator } from '../locator.service';
import { MessageService } from '../message.service';
import { ModalRuntimeComponent } from './modal-runtime.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  private type :string;
  private mode : string;


  constructor(public dialogRef: MatDialogRef<ModalComponent> ,
     @Inject(MAT_DIALOG_DATA) public data: any,private cmsService: CmsService ,private hostElement: ElementRef ,
     private compiler: Compiler ,private messageService: MessageService ,
     private moduleService: ModuleService ,private sharedService: SharedService ,
     private sanitizer: DomSanitizer) {

         this.type = data.type ;
         this.mode = data.mode ;
         this.currentData = data.data;
         this.initiateDialogTemplate();
    }

  private initiateDialogTemplate(){
     this.cmsService.getFragment(ServiceLocator.dialogTemplate,this.type , this.mode).toPromise()
         .then(response =>{
          let fragment = Fragmentcms.getFragment(response);
          var styles :string ="";
          if(fragment.getCssStyle()!=null){
            styles = fragment.getCssStyle();
          }
          this.compileTemplate(fragment.getHtmlTemplate(),[styles]); 
         }).catch(err => {
           console.error(err);
         });
  }

  ngOnInit() {
  }

   /**
     * Compile the template
     */
    public compileTemplate(template , styles) {      
      let metadata = {
         selector: `isis-modal`,
         template: template,
         styles: styles
      };
      let factory = this.createComponentFactorySync(this.compiler, metadata, ModalRuntimeComponent);
     
      if (this.componentRef) {
          //this.container.remove(this.container.indexOf(0));
          this.componentRef.destroy();
          this.componentRef = null;
      }
      
      this.componentRef = this.container.createComponent(factory);
      
  }
  
  
  /**
     * Create new component 
     */
    private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
      const cmpClass = componentClass || class ModalRuntimeComponent { name: string = 'Denys' };
      const decoratedCmp = Component(metadata)(cmpClass);
       
      @NgModule({ imports: [FormsModule ,MatDialogModule,CommonModule], declarations: [decoratedCmp] })
      class ModalRuntimeModule { }
     try{
       //Clear the cache before create new module
       compiler.clearCache();
      let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(ModalRuntimeModule);
      return module.componentFactories.find(f => f.componentType === decoratedCmp);
     }catch(err){
       console.error(err);      
     }
  }
  
@ViewChild('isismodal', { read: ViewContainerRef })
container: ViewContainerRef;

  componentRef: ComponentRef<any>
  
  message: any;
  
  subscription: Subscription;

  currentNode : Navigation ;

  currentData : any ;

}
