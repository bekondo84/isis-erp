import { Injectable } from '@angular/core';
import { Module } from '../data-model/module';
import { ThemeCms } from '../data-model/theme-cms';
import { Navigation } from '../data-model/navigation';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getModule(){ return this.module ;}
  setModule(module: Module){ this.module = module ;}
  getOffset(){ return this.offset;}
  getMax(){ return this.max;}
  getNavNode(){ return this.navNode;}
  getTheme(){ return this.theme ;}

  getModules(){ return this.modules ;}
  setModules(modules: Module[]){ this.modules = modules ;}
  setOffset(offset :number){this.offset = offset;}
  setMax(max :number){ this.max = max ;}
  setNavNode(node :Navigation){ this.navNode = node ;}
  setTheme(theme: ThemeCms){ this.theme = theme ; }

  private module :Module ;
  private modules :Module[] = [];
  private theme : ThemeCms ;
  private offset :number = 0 ;
  private max :number =100;
  private navNode :Navigation;
}
