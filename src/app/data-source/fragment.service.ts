import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fragmentcms } from '../data-model/fragmentcms';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FragmentService {

  constructor(private http: HttpClient , private configService: ConfigService) { }

  getFragment(name :string){
    var url = `http://localhost:8080/backoffice/cms/fragment/${name}`;
    return  this.http.get<Fragmentcms>(url);
  }
}
