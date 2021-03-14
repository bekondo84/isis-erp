import { Injector } from '@angular/core';


export class ServiceLocator {

  static injector: Injector;

  static ListMode: string = "list";
  static ViewMode: string = "view";
  static loginPageTypeValue : string = "login";
  static homePageTypeValue : string = "home";
  static modulePageTypeValue : string = "module";
  static typeEvents : Array<string> =["PAGE","FRAGMENT"];
  static actions: Array<string> =["init" ,"create" ,"cancel","edit","save","delete"];
  
}
