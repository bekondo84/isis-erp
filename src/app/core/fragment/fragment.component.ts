import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewInit, Compiler, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, ModuleWithComponentFactories, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Fragmentcms } from 'src/app/data-model/fragmentcms';
import { Navigation } from 'src/app/data-model/navigation';
import { ThemeCms } from 'src/app/data-model/theme-cms';
import { ModuleService } from 'src/app/data-source/module.service';
import { SharedService } from 'src/app/data-source/shared.service';
import { CmsService } from '../cms.service';
import { CoreModule } from '../core.module';
import { FragmentDirective } from '../fragment.directive';
import { ServiceLocator } from '../locator.service';
import { MessageService } from '../message.service';
import { ViewComponent } from './view.component';

@Component({
  selector: 'appView',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.css']
})
export class FragmentComponent implements OnInit   {

  @ViewChild(FragmentDirective , { static: true } ) 
  adHost: FragmentDirective;
  

  constructor(private cmsService: CmsService ,private hostElement: ElementRef ,
    private compiler: Compiler ,private messageService: MessageService ,
    private moduleService: ModuleService ,private sharedService: SharedService ,
    private sanitizer: DomSanitizer) { 
      this.subscription = this.messageService.getMessage().subscribe(message=>{
        //console.log("Recieve Events : "+JSON.stringify(sharedService.getNavNode()));
        if(message.data.type===ServiceLocator.typeEvents[1]){
          this.currentNode = this.sharedService.getNavNode();    
          this.showFragment(message.data);
       }    
    });
    }

    /**
     * 
     * @param data Show Fragment 
     * @returns 
     */
    showFragment(data: any){

      if(data == null){
        return ;
      }
      //Initialize Fragment
      if(data.action === ServiceLocator.actions[0]){
             this.initFragment();
      }

      if(data.action===ServiceLocator.actions[1] || data.action===ServiceLocator.actions[3]){
           this.viewFragment();
      }

      if(data.action===ServiceLocator.actions[2]){
        this.listFragment();
      }
     
    }

    viewFragment(){
      let fragmentCode = this.currentNode.getViewFragKey();
      if(fragmentCode == null){
        let theme : ThemeCms = this.sharedService.getTheme();
        if(theme != null && theme.getViewTemplate() != null){
          fragmentCode = theme.getViewTemplate().getCode();
        }else{
          //Error back config object
        }
      }
        this.loadListFragment(fragmentCode ,this.currentNode.getType());
    }

    listFragment(){
      let fragmentCode = this.currentNode.getListFragKey();
      if(fragmentCode == null){
        let theme : ThemeCms = this.sharedService.getTheme();
        if(theme != null && theme.getListTemplate() != null){
          fragmentCode = theme.getListTemplate().getCode();
        }else{
          //Error back config object
        }
      }
      this.loadListFragment(fragmentCode ,this.currentNode.getType());
    }

    initFragment(){
      let viewModes = this.currentNode.getViewMode().split(',');      
      
      if(viewModes[0]==ServiceLocator.ListMode && this.currentNode.getModal()===false){
         this.listFragment();
      }

      if(viewModes[0]===ServiceLocator.ViewMode && this.currentNode.getModal()===false){
        //console.log("VIEW AND Non Modal : "+this.currentNode.getViewMode()+" ======= "+viewModes[0]);
        this.compileTemplate(this.getTemplate(),[]);  
      }
      
    }

    loadListFragment(code :string ,type :string){
        //console.log("*********************** --------------- "+type);
        this.cmsService.getFragment(code , type).toPromise()
               .then(response =>{
                   let fragment = Fragmentcms.getFragment(response);
                   var styles :string ="";
                   if(fragment.getCssStyle()!=null){
                     styles = fragment.getCssStyle();
                   }

                   try{
                     this.compileTemplate(fragment.getHtmlTemplate(),[styles]); 
                   }catch(err){
                     console.error(err);
                   }
               }).catch(err =>{
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
       selector: `isis-view`,
       template: template,
       styles: styles
    };
    let factory = this.createComponentFactorySync(this.compiler, metadata, ViewComponent);
   
    if (this.componentRef) {
        //this.container.remove(this.container.indexOf(0));
        this.componentRef.destroy();
        this.componentRef = null;
    }
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(factory);
    
}


/**
   * Create new component 
   */
  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
    const cmpClass = componentClass || class ViewComponent { name: string = 'Denys' };
    const decoratedCmp = Component(metadata)(cmpClass);
     
    @NgModule({ imports: [FormsModule ,CommonModule,CoreModule], declarations: [decoratedCmp] })
    class ViewComponentModule { }
   try{
     //Clear the cache before create new module
     compiler.clearCache();
    let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(ViewComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
   }catch(err){
     console.error(err);      
   }
}
  
  componentRef: ComponentRef<any>
  
  message: any;
  
  subscription: Subscription;

  currentNode : Navigation ;
  
  
}
