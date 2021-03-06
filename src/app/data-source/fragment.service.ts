import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceLocator } from '../core/locator.service';
import { Fragmentcms } from '../data-model/fragmentcms';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FragmentService {

  constructor(private http: HttpClient , private configService: ConfigService) { }

  getFragment(name :string ,type :string ,viewType: string){
    let fragment = name ;
    if(name == null){
      if(viewType===ServiceLocator.ViewMode){
        fragment = "default_View_Fragment";
      }
      if(viewType===ServiceLocator.ListMode){
        fragment = "default_List_Fragment"; 
      }
    }
    var url = `http://localhost:8080/backoffice/cms/fragment/${fragment}/${type}`;
    return  this.http.get<Fragmentcms>(url);
    
  }

  
}
