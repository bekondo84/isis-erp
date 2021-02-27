import {Component, Input} from '@angular/core';
import { MessageService } from './message.service';
import { ServiceLocator } from './locator.service';

export class RuntimeComponent{

    public loader ;
    /**
     * 
     */
    //@Input() modulescreen : string  ;

    public modulescreen : string = "modules" ;

    public  screen :string = "modules"

    public currentmodule : string = null;

    /**
     * 
     * @param messageService 
     */
    constructor(){
       this.loader =  ServiceLocator.injector.get(MessageService);
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
     * Section of function
     */
    /**
     * name
     */
     public showView() {
        console.log("before ============================================= "+this.modulescreen);
        if(this.modulescreen=="modules"){
            this.modulescreen = "module";            
            //this.currentmodule = modulename;
        }else{
            this.modulescreen = "modules";
        }//end  if(this.modulescreen=="modules"){
        console.log("after ============================================= "+this.modulescreen);
        this.sendMessage(this.modulescreen);
    }
}