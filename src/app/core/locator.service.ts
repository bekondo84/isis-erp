import { Injector } from '@angular/core';


export class ServiceLocator {

  static injector: Injector;

  static loginPageTypeValue : string = "login";
  static homePageTypeValue : string = "home";
  static modulePageTypeValue : string = "module";
  
}
