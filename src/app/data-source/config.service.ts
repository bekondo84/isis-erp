import { Injectable } from '@angular/core';
import { from, Observable ,throwError } from 'rxjs';
import {catchError , retry} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  configUrl = 'assets/config.json';

  getConfig(): Promise<Config>{
    return this.http.get<Config>(this.configUrl).toPromise();
  }


  private config: Config;

  const
}
