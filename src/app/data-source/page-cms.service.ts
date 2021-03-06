import { Injectable } from '@angular/core';
import { from, Observable ,throwError } from 'rxjs';
import {catchError , retry} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Config } from './config';
import { Pagecms } from '../data-model/pagecms';


@Injectable({
  providedIn: 'root'
})
export class PageCmsService {

  constructor(private http: HttpClient , private configService: ConfigService) {             
  }

 

  getPage(code: string) {
    
     var url = `http://localhost:8080/backoffice/cms/page/${code}`;
      return  this.http.get<Pagecms>(url);
  }

  getLoginPage(){
    var url = `http://localhost:8080/backoffice/cms/login`;
    return  this.http.get<Pagecms>(url);
  }

  getHomePage(){
    var url = `http://localhost:8080/backoffice/cms/home`;
    return  this.http.get<Pagecms>(url);
  }

  getApplicationPage(){
    var url = `http://localhost:8080/backoffice/cms/application`;
    return  this.http.get<Pagecms>(url);
  }
 
}
