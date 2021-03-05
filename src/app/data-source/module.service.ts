import { Injectable } from '@angular/core';
import { from, Observable ,throwError } from 'rxjs';
import {catchError , retry} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Config } from './config';
import { Module } from '../data-model/module';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient , private configService: ConfigService ) { }

  getInstallModules(offset :number , max :number){
    var url = `http://localhost:8080/backoffice/module/install/${offset}/${max}`;
    return  this.http.get<Module[]>(url);
  }

  getModuleByName(name :string){
    var url = `http://localhost:8080/backoffice/module/load/${name}`;
    return  this.http.get<Module>(url);
  }
}
