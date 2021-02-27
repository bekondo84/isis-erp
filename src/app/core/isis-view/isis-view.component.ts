import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactory, ComponentRef, ElementRef, ModuleWithComponentFactories, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CmsService } from '../cms.service';
import { CoreModule } from '../core.module';
import { RuntimeComponent } from '../runtime.component';

@Component({
  selector: 'isis',
  templateUrl: './isis-view.component.html',
  styleUrls: ['./isis-view.component.css']
})
export class IsisViewComponent implements OnInit {


  constructor(private cmsService: CmsService ,private hostElement: ElementRef ,
      private compiler: Compiler ) { }

     
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

  /**
     * Section of function
     */
    /**
     * name
     */
    public showView() {
      console.log("============================================= "+this.modulescreen);
      if(this.modulescreen=="modules"){
          this.modulescreen = "module";
          //this.currentmodule = modulename;
      }else{
          this.modulescreen = "modules";
      }//end f(this.modulescreen=="modules"){         
  }

  ngOnInit(){
      this.compileTemplate(this.cmsService.defaultscreen(this.modulescreen),[]); 
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

  public template : any = null;

  public styles : any =null ;
  
  public modulescreen : string = "modules" ;

  public  screen :string = "module"

  public currentmodule : string = null;
}
