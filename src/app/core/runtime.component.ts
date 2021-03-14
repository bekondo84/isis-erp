import {Component, Input} from '@angular/core';
import { MessageService } from './message.service';
import { ServiceLocator } from './locator.service';
import { ModuleService } from '../data-source/module.service';
import { Module } from '../data-model/module';
import { SharedService } from '../data-source/shared.service';
import { Navigation } from '../data-model/navigation';

export class RuntimeComponent{

    public loader ;

    name: string = 'Denys'
      
      
    moduleService: ModuleService;
    sharedService: SharedService;
    module: Module;
    modules :Module[];

    /**
     * 
     * @param messageService 
     */
    constructor(){
       this.loader =  ServiceLocator.injector.get(MessageService);
       this.moduleService = ServiceLocator.injector.get(ModuleService);
       this.sharedService = ServiceLocator.injector.get(SharedService);
       this.module = this.sharedService.getModule();
       this.modules = this.sharedService.getModules();
    }

    sendMessage(message:any):void{
         // send message to subscribers via observable subject
         this.loader.sendMessage(message);
    }

    clearMessage(): void {
        // clear message
        this.loader.clearMessage();
    }

    /**
     * login
     */
    public login() {
        console.log("Login function call");
        this.loadModules();
       
    }
   

    public logout(){
        console.log("LOGIN OUT function call");
        var data ={"pageType":null,"moduleName":null,"type":ServiceLocator.typeEvents[0]};
        data.pageType = ServiceLocator.loginPageTypeValue;
        data.moduleName = null;
        this.sendMessage(data);
    }

    /**
     * showFragment
      type: string ,endPoint: string     
   */
    public getSelectNode(node :Navigation) {
        this.sharedService.setNavNode(node);
        var data ={"pageType":null,"moduleName":null ,
                   "type":ServiceLocator.typeEvents[1],"action":ServiceLocator.actions[0]
                  };
        data.pageType = ServiceLocator.modulePageTypeValue;
        this.sendMessage(data);       
    }
    /**
     * showModulePaget
       name: string    
     */
    public showModulePage(name: string) {
        this.loadModule(name);
    }

    /**
     * showHomePage
     */
    public showHomePage() {
        this.loadModules();
    }

     /**
     * loadModules
     */
    private loadModules() {
        this.moduleService.getInstallModules(this.sharedService.getOffset() , this.sharedService.getMax())
            .toPromise()
            .then(response =>{
                var answers :Module[] = new Array();
                response.forEach(mod =>{
                    answers.push(Module.getInstance(mod));
                });
              this.sharedService.setModules(answers);
              var data ={"pageType":ServiceLocator.homePageTypeValue,"moduleName":null , "type":null};
              data.pageType = ServiceLocator.homePageTypeValue;
              data.moduleName = null;
              data.type = ServiceLocator.typeEvents[0];
              this.sendMessage(data);
            }).catch(err =>{
                console.error(err);
            });
    }

    private loadModule(name: string) {
       
        this.moduleService.getModuleByName(name).toPromise()
            .then(response =>{
                this.sharedService.setModule(Module.getInstance(response));
                var data ={"pageType":null,"moduleName":null , "type":null};
                data.pageType = ServiceLocator.modulePageTypeValue;
                data.moduleName = name;
                data.type = ServiceLocator.typeEvents[0];
                this.sendMessage(data);
            }).catch(err =>{
               console.error(err);
            })
        
    }  
    
  
}