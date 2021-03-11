import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Pagecms } from '../data-model/pagecms';
import { ThemeCms } from '../data-model/theme-cms';
import { FragmentService } from '../data-source/fragment.service';
import { PageCmsService } from '../data-source/page-cms.service';
import { ThemeCmsService } from '../data-source/theme-cms.service';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private pageCmsService: PageCmsService , private themeCmsService: ThemeCmsService, private fragmentService: FragmentService) { }  


  /**
   * getActiveTheme
   */
  public getActiveTheme(): Observable<ThemeCms> {
    return this.themeCmsService.getActiveTheme();
  }
  /**
   * Return the promise of the template page
   */
  public getTemplatePage(code: string){
    return this.pageCmsService.getPage(code);
  }

  /**
   * 
   * @param code 
   * @returns 
   */
  public getFragment(code: string){
    return this.fragmentService.getFragment(code);
  }

}
