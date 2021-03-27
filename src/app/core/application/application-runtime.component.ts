
import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/data-model/module';
import { Navigation } from 'src/app/data-model/navigation';
import { SharedService } from 'src/app/data-source/shared.service';
import { ServiceLocator } from "../locator.service";
import { MessageService } from "../message.service";


export class ApplicationRuntimeComponent {

    public loader ;
    private router : Router;
    public module: Module ;
    private sharedService : SharedService;

    constructor(){
        this.loader = ServiceLocator.injector.get(MessageService);
        this.router = ServiceLocator.injector.get(Router);
        this.sharedService = ServiceLocator.injector.get(SharedService);
        this.module = this.sharedService.getModule();
    }

    /**
     * login
     */
     public login() {
        console.log("Login function call");
        this.router.navigateByUrl("/");
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

}
