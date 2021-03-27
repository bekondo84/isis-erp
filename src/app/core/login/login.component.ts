import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactory, ComponentRef, ElementRef, ModuleWithComponentFactories, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { CoreModule } from '../core.module';
import { Pagecms } from 'src/app/data-model/pagecms';
import { ModuleService } from 'src/app/data-source/module.service';
import { SharedService } from 'src/app/data-source/shared.service';
import { CmsService } from '../cms.service';
import { MessageService } from '../message.service';
import { RuntimeComponent } from '../runtime.component';
import { LoginRuntimeComponent } from './login-runtime.component';
import { ServiceLocator } from '../locator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'isis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cmsService :CmsService ,private hostElement :ElementRef ,
    private compiler :Compiler ,private messageService :MessageService ,
    private moduleService :ModuleService ,private sharedService : SharedService ,
    activeRoute: ActivatedRoute) {

       console.log("INSIDE LOGIN COMPONENT : "+activeRoute.snapshot.url[1]);
     }


    /**
     * Compile the template
     */
     public compileTemplate(template , styles) {      
      let metadata = {
         selector: `isis-login`,
         template: template,
         styles: styles
      };
      let factory = this.createComponentFactorySync(this.compiler, metadata, LoginRuntimeComponent);
     
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
      const cmpClass = componentClass || class LoginRuntimeComponent { name: string = 'Denys' };
      const decoratedCmp = Component(metadata)(cmpClass);
       
      @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
      class LoginComponentModule { }
     try{
       //Clear the cache before create new module
       compiler.clearCache();
      let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(LoginComponentModule);
      return module.componentFactories.find(f => f.componentType === decoratedCmp);
     }catch(err){
       console.error(err);      
     }
  }

  public showLoginPage(){
    this.cmsService.getLoginPage().toPromise()
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
    this.showLoginPage();
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

  @ViewChild('isislogin', { read: ViewContainerRef })
  container: ViewContainerRef;
 
  componentRef: ComponentRef<any>


  message: any;
  
  subscription: Subscription;
 
  pageTemplate: Pagecms;

  session: any = null;

  public template : any = null;

  public styles : any =null ;  
}
