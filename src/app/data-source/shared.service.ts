import { Injectable } from '@angular/core';
import { Module } from '../data-model/module';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getModule(){ return this.module ;}
  setModule(module: Module){ this.module = module ;}

  getModules(){ return this.modules ;}
  setModules(modules: Module[]){ this.modules = modules ;}

  private module : Module = new Object();
  private modules :Module[] = [];
}
