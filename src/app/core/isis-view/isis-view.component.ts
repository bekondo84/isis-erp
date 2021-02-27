import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactory, ComponentRef, ElementRef, ModuleWithComponentFactories, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { Pagecms, pagecms } from '../../data-model/pagecms';
import { CmsService } from '../cms.service';
import { MessageService } from '../message.service';
import { CoreModule } from '../core.module';
import { RuntimeComponent } from '../runtime.component';
import { ThemeCms } from 'src/app/data-model/theme-cms';

@Component({
  selector: 'isis',
  templateUrl: './isis-view.component.html',
  styleUrls: ['./isis-view.component.css']
})
export class IsisViewComponent implements OnInit {


  constructor(private cmsService: CmsService ,private hostElement: ElementRef ,
      private compiler: Compiler ,private messageService: MessageService ) {

          this.subscription = this.messageService.getMessage().subscribe(message=>{
            this.currentmodule=message;
            //this.showView();
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
          //this.container.remove(this.container.indexOf());
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

      @NgModule({ imports: [CommonModule ,CoreModule ], declarations: [decoratedCmp] })
      class RuntimeComponentModule { }

      let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
      return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

  private getPage(value: any): Pagecms {
    return new Pagecms(value.pK,value.code,value.name,value.cssStyle,value.htmlTemplate);
  }
  /**
     * Section of function
     */
    /**
     * name
     */
    public showView(response: any) {
      this.theme = new ThemeCms(response.pK,response.code,response.name,response.active);            
      
      if(response.loginTemplate != null){
         this.theme.setLoginTemplate(this.getPage((response.loginTemplate));
      }

      if(response.homeTemple != null){
        this.theme.setHomeTemplate(this.getPage(response.homeTemple));
      }

      if(response.moduleTemplate != null){
        this.theme.setModuleTemplate(this.getPage(response.moduleTemplate));
      }

      if(this.theme == null){
         return ;
      }
     
      if(this.session == null){

        if(this.theme.getLoginTemplate() == null){
          //Show error page to notify that the theme is not correct
          return;
        }
        this.pageTemplate = this.theme.getLoginTemplate();
        this.cmsService.getTemplatePage(this.pageTemplate.getCode())
                       .toPromise()
                       .then(response => {
                        this.pageTemplate = this.getPage(response);
                        this.initView();
                       }).catch(error =>{
                        console.log("Promise rejected with " + JSON.stringify(error));
                       });

      }

  }

  public initView(){
    this.compileTemplate(this.pageTemplate.htmlTemplate,[this.pageTemplate.getCssStyle()]); 
  }

  ngOnInit(){
      this.cmsService.getActiveTheme()
          .toPromise()
          .then((response) =>{
            this.showView(response)
          }).catch((error) =>{
             console.log("Promise rejected with " + JSON.stringify(error));
          });      
      //console.log("Call of the IHM builder "+this.hostElement.nativeElement.querySelector('#container').outerHTML);
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

  public currentmodule : string = null;
}
