import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/data-model/module';
import { ModuleService } from 'src/app/data-source/module.service';
import { SharedService } from 'src/app/data-source/shared.service';
import { ServiceLocator } from "../locator.service";
import { MessageService } from "../message.service";


export class HomeRuntimeComponent {

    moduleService: ModuleService;
    sharedService: SharedService;
    private router : Router;
    public loader ;
    modules : Module[];

    constructor(){
        this.loader = ServiceLocator.injector.get(MessageService);
        this.moduleService = ServiceLocator.injector.get(ModuleService);
       this.sharedService = ServiceLocator.injector.get(SharedService);
       this.router = ServiceLocator.injector.get(Router);
       this.loadDatas();
    }

    sendMessage(message:any):void{
        // send message to subscribers via observable subject
        this.loader.sendMessage(message);
    }

   clearMessage(): void {
       // clear message
       this.loader.clearMessage();
   }

   public logout(){
     console.log("LOGIN OUT function call");
     this.router.navigateByUrl("/login");
   }

   /**
     * showModulePaget
       name: string    
     */
       public showModulePage(name: string) {
        this.router.navigateByUrl("/"+name);
    }

   private loadDatas(){
       this.moduleService.getInstallModules(this.sharedService.getOffset() , this.sharedService.getMax())
         .toPromise()
         .then(response => {
            var answers :Module[] = new Array();
            response.forEach(mod =>{
                answers.push(Module.getInstance(mod));
            });
          this.sharedService.setModules(answers);
          this.modules = answers ;
         }).catch(err => {
             console.error(err);
         });
   }
}
