import { Component, Input} from '@angular/core';
import { SharedService } from 'src/app/data-source/shared.service';
import { ServiceLocator } from '../locator.service';
import { MessageService } from '../message.service';

export class ModalRuntimeComponent {
    
    public loader ;
    sharedService : SharedService;


    constructor(){
        this.loader = ServiceLocator.injector.get(MessageService);
        this.sharedService = ServiceLocator.injector.get(SharedService);
       // console.log("MODAl RUNTIME COMPONENT ========= "+this.sharedService.getStaskhead());
    }

    datas: Array<any> = new Array();
    currentData: any = new Object();
}
