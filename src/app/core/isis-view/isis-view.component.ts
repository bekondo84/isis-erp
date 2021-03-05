import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactory, ComponentRef, ElementRef, ModuleWithComponentFactories, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { Pagecms } from '../../data-model/pagecms';
import { CmsService } from '../cms.service';
import { MessageService } from '../message.service';
import { ServiceLocator } from '../locator.service';
import { ModuleService } from '../../data-source/module.service';
import { RuntimeComponent } from '../runtime.component';
import { ThemeCms } from 'src/app/data-model/theme-cms';
import { Module } from 'src/app/data-model/module';

@Component({
  selector: 'isis',
  templateUrl: './isis-view.component.html',
  styleUrls: ['./isis-view.component.css']
})
export class IsisViewComponent implements OnInit {


  constructor(private cmsService: CmsService ,private hostElement: ElementRef ,
      private compiler: Compiler ,private messageService: MessageService ,
      private moduleService: ModuleService) {
        this.subscription = this.messageService.getMessage().subscribe(message=>{
          
           this.showView(message.data.pageType ,message.data.moduleName);          
       });
      }
    
     
  /**
     * Compile the template
     */
    public compileTemplate(template , styles) {      
      let metadata = {
         selector: `isis-core`,
         template: template,
         styles: styles
      };
      let factory = this.createComponentFactorySync(this.compiler, metadata, RuntimeComponent);
     
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
      const cmpClass = componentClass || class RuntimeComponent { name: string = 'Denys' };
      const decoratedCmp = Component(metadata)(cmpClass);
      
      @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
      class RuntimeComponentModule { }
     try{
       //Clear the cache before create new module
       compiler.clearCache();
      let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
      return module.componentFactories.find(f => f.componentType === decoratedCmp);
     }catch(err){
       console.error(err);      
     }
  }

  private getPage(value: any): Pagecms {
    return new Pagecms(value.pK,value.code,value.name,value.cssStyle,value.htmlTemplate);
  }

 
  /**
   * 
   * @param response 
   */
  setCurrentTheme(response: any){
      this.theme = new ThemeCms(response.pK,response.code,response.name,response.active);
      if(response.loginTemplate != null){
          this.theme.setLoginTemplate(this.getPage(response.loginTemplate));
      }

      if(response.homeTemplate != null){
        this.theme.setHomeTemplate(this.getPage(response.homeTemplate));
      }

      if(response.moduleTemplate != null){
        this.theme.setModuleTemplate(this.getPage(response.moduleTemplate));
      }
  }
  /**
     * Section of function
     */
    /**
     * name
     */
    public showView(pageType : string ,name :string ) {     
      this.showPage(pageType);    
  } 
  
  /**
   * 
   * @param pagetype Show page to load
   */
  public showPage(pagetype: string){
      this.pageTemplate = this.theme.getLoginTemplate();
      
      if(pagetype===ServiceLocator.homePageTypeValue){
        this.pageTemplate = this.theme.getHomeTemplate();
      }

      if(pagetype===ServiceLocator.modulePageTypeValue){
        this.pageTemplate = this.theme.getModuleTemplate();
      }
      this.cmsService.getTemplatePage(this.pageTemplate.getCode())
                       .toPromise()
                       .then(response => {
                        this.pageTemplate = this.getPage(response);
                        this.initView();
                       }).catch(error =>{
                        console.error(error);
                       });
  }

  public initView(){    
    var styles :string ="";
    if(this.pageTemplate.getCssStyle()!=null){
      styles = this.pageTemplate.getCssStyle();
    }    
    try{
      this.compileTemplate(this.pageTemplate.getHtmlTemplate(),[styles]); 
    }catch(err){
      console.error(err);
    }
  }



  ngOnInit(){   
    if(this.theme == null){
      this.cmsService.getActiveTheme()
          .toPromise()
          .then((response) =>{
            this.setCurrentTheme(response);
            this.showView(ServiceLocator.loginPageTypeValue ,null);
          }).catch((error) =>{
             console.error(error);
          });      
    }
      
  }

  ngOnChanges() {
      
  }
  ngAfterViewInit(){
       //this.updateComponent();
  }
  

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
 
  componentRef: ComponentRef<any>


  message: any;
  
  subscription: Subscription;

  theme: ThemeCms;

  pageTemplate: Pagecms;

  session: any = null;

  public template : any = null;

  public styles : any =null ;
  
  public  screen :string = "module"

  currentmodule : Module = null;
  modules :Module[] = [];
  
}
