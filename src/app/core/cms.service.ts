import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Pagecms } from '../data-model/pagecms';
import { ThemeCms } from '../data-model/theme-cms';
import { FragmentService } from '../data-source/fragment.service';
import { PageCmsService } from '../data-source/page-cms.service';
import { ThemeCmsService } from '../data-source/theme-cms.service';
import { ServiceLocator } from './locator.service';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private pageCmsService: PageCmsService ,
               private themeCmsService: ThemeCmsService, 
               private fragmentService: FragmentService) { }  


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
    if(code === ServiceLocator.loginPageTypeValue){
      return this.pageCmsService.getLoginPage();
    }
    if(code===ServiceLocator.homePageTypeValue){
      return this.pageCmsService.getHomePage();
    }
    if(code===ServiceLocator.modulePageTypeValue){
      return this.pageCmsService.getApplicationPage();
    }
    return this.pageCmsService.getPage(code);
  }

  public getLoginPage(){
    return this.pageCmsService.getLoginPage();
  }

  public getHomePage(){
    return this.pageCmsService.getHomePage();
  }

  public getApplicationPage(){
    return this.pageCmsService.getApplicationPage();
  }
  /**
   * 
   * @param code 
   * @returns 
   */
  public getFragment(code: string , type :string ,viewMode: string){
    return this.fragmentService.getFragment(code ,type ,viewMode);
  }

}
