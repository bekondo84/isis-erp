import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactory, ComponentRef, ElementRef, ModuleWithComponentFactories, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Module } from 'src/app/data-model/module';
import { Pagecms } from 'src/app/data-model/pagecms';
import { ModuleService } from 'src/app/data-source/module.service';
import { SharedService } from 'src/app/data-source/shared.service';
import { CmsService } from '../cms.service';
import { CoreModule } from '../core.module';
import { FragmentComponent } from '../fragment/fragment.component';
import { MessageService } from '../message.service';
import { ApplicationRuntimeComponent } from './application-runtime.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private cmsService :CmsService ,private hostElement :ElementRef ,
    private compiler :Compiler ,private messageService :MessageService ,
    private moduleService :ModuleService ,private sharedService : SharedService,
    private activateRoute : ActivatedRoute) { 
       this.extension = activateRoute.snapshot.params["extension"];
    }

       /**
     * Compile the template
     */
        public compileTemplate(template , styles) {      
          let metadata = {
             selector: `isis-app`,
             template: template,
             styles: styles
          };
          let factory = this.createComponentFactorySync(this.compiler, metadata, ApplicationRuntimeComponent);
         
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
    const cmpClass = componentClass || class ApplicationRuntimeComponent { name: string = 'Denys' };
    const decoratedCmp = Component(metadata)(cmpClass);
     
    @NgModule({ imports: [CommonModule,CoreModule], declarations: [decoratedCmp] })
    class ApplicationCoreModule { }
   try{
     //Clear the cache before create new module
     compiler.clearCache();
    let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(ApplicationCoreModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
   }catch(err){
     console.error(err);      
   }
}

private loadExtensionDataAndPage(name :string){
  console.log("Inside loadExtensionDataAndPage ::::::::: "+name)
  this.moduleService.getModuleByName(name).toPromise()
  .then(response =>{
      let module: Module = Module.getInstance(response) ;
      this.sharedService.setModule(module);   
      this.showExtensionpage();
  }).catch(err =>{
     console.error(err);
  })
}

private showExtensionpage(){
  this.cmsService.getApplicationPage().toPromise()
      .then(response => {
         this.pageTemplate = Pagecms.getPage(response);
         var styles :string ="";
        if(this.pageTemplate.getCssStyle()!=null){
          styles = this.pageTemplate.getCssStyle();
        }    
        this.compileTemplate(this.pageTemplate.getHtmlTemplate(),[styles]); 
      }).catch(err => {
        console.error(err);
      });
}
 
  ngOnInit() {
    this.loadExtensionDataAndPage(this.extension);
  }

  @ViewChild('isiscore', { read: ViewContainerRef })
  container: ViewContainerRef;
 
  componentRef: ComponentRef<any>


  message: any;
  
  subscription: Subscription;
 
  pageTemplate: Pagecms;

  session: any = null;

  public template : any = null;

  public styles : any =null ;  

  extension: string = "";
   module : Module ;
}
