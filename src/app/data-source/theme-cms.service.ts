import { Injectable } from '@angular/core';
import { from, Observable ,throwError } from 'rxjs';
import {catchError , retry} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Config } from './config';
import { ThemeCms } from '../data-model/theme-cms';

@Injectable({
  providedIn: 'root'
})
export class ThemeCmsService {

  constructor(private http: HttpClient , private configService: ConfigService) { }

  getActiveTheme(): Observable<ThemeCms> {
    var url = "http://localhost:8080/backoffice/cms/theme";
      return  this.http.get<ThemeCms>(url);
  }

}
