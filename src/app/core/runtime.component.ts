import {Component, Input} from '@angular/core';
import { MessageService } from './message.service';
import { ServiceLocator } from './locator.service';
import { ModuleService } from '../data-source/module.service';
import { Module } from '../data-model/module';
import { SharedService } from '../data-source/shared.service';

export class RuntimeComponent{

    public loader ;
    /**
     * 
     */
    //@Input() modulescreen : string  ;

   
    name: string = 'Denys'
      
      
    moduleService: ModuleService;
    sharedService: SharedService;
    module: Module;

    /**
     * 
     * @param messageService 
     */
    constructor(){
       this.loader =  ServiceLocator.injector.get(MessageService);
       this.moduleService = ServiceLocator.injector.get(ModuleService);
       this.sharedService = ServiceLocator.injector.get(SharedService);
       this.module = this.sharedService.getModule();
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
        var data ={"pageType":ServiceLocator.homePageTypeValue,"moduleName":null};
        data.pageType = ServiceLocator.homePageTypeValue;
        data.moduleName = null;
        this.sendMessage(data);
    }

    public logout(){
        console.log("LOGIN OUT function call");
        var data ={"pageType":null,"moduleName":null};
        data.pageType = ServiceLocator.loginPageTypeValue;
        data.moduleName = null;
        this.sendMessage(data);
    }

    
    public loadModule(name: string) {
        console.log("Call of load module "+name);
        this.moduleService.getModuleByName(name).toPromise()
            .then(response =>{
                this.sharedService.setModule(Module.getInstance(response));
                console.log("Laod of Module : "+JSON.stringify(this.sharedService.getModule()));                
                var data ={"pageType":null,"moduleName":null};
                data.pageType = ServiceLocator.modulePageTypeValue;
                data.moduleName = name;
                this.sendMessage(data);
            }).catch(err =>{
               console.error(err);
            })
        
    }  
    
  
}