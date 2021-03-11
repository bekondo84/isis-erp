import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  constructor(private http: HttpClient , private configService: ConfigService) { }

  getEmptyInstance(type: string){
    var url = `http://localhost:8080/backoffice/core/new/${type}`;
    return  this.http.get<any>(url);
  }
}
