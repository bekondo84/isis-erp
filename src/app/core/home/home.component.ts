import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactory, ComponentRef, ElementRef, ModuleWithComponentFactories, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pagecms } from 'src/app/data-model/pagecms';
import { ModuleService } from 'src/app/data-source/module.service';
import { SharedService } from 'src/app/data-source/shared.service';
import { CmsService } from '../cms.service';
import { CoreModule } from '../core.module';
import { ServiceLocator } from '../locator.service';
import { MessageService } from '../message.service';
import { HomeRuntimeComponent } from './home-runtime.component';

@Component({
  selector: 'isis-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cmsService :CmsService ,private hostElement :ElementRef ,
    private compiler :Compiler ,private messageService :MessageService ,
    private moduleService :ModuleService ,private sharedService : SharedService) {           
          console.log("INSIDE HOME COMPONENT");
     }

       /**
     * Compile the template
     */
        public compileTemplate(template , styles) {      
          let metadata = {
             selector: `isis-home`,
             template: template,
             styles: styles
          };
          let factory = this.createComponentFactorySync(this.compiler, metadata, HomeRuntimeComponent);
         
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
    const cmpClass = componentClass || class HomeRuntimeComponent { name: string = 'Denys' };
    const decoratedCmp = Component(metadata)(cmpClass);
     
    @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
    class HomeComponentModule { }
   try{
     //Clear the cache before create new module
     compiler.clearCache();
    let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(HomeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
   }catch(err){
     console.error(err);      
   }
}


public showHomePage(){
  this.cmsService.getHomePage().toPromise()
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
    this.showHomePage();
  }

  ngOnChanges() {
      
  }
  ngAfterViewInit(){
       //this.updateComponent();
  }
  

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      //this.subscription.unsubscribe();
  }

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
 
  componentRef: ComponentRef<any>


  message: any;
  
  subscription: Subscription;
 
  pageTemplate: Pagecms;

  session: any = null;

  public template : any = null;

  public styles : any =null ;  

}
