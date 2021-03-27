import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLocator } from "../locator.service";
import { MessageService } from "../message.service";

export class LoginRuntimeComponent {

    public loader ;
    private router : Router;

    constructor(){
       this.loader = ServiceLocator.injector.get(MessageService);
       this.router = ServiceLocator.injector.get(Router);
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
        this.router.navigateByUrl("/");
    }
   

    

}
