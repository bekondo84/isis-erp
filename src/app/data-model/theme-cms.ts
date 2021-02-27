import { from } from "rxjs";
import { Pagecms } from './pagecms';

export class ThemeCms {

    private pK: number ;
    private code: string;
    private name: string;
    private active: boolean;
    private loginTemplate: Pagecms;
    private homeTemplate: Pagecms;
    private moduleTemplate: Pagecms;

    constructor(pK: number , code: string ,name: string, active: boolean){
        this.pK = pK;
        this.code = code;
        this.name = name;
        this.active = active;
    }

    setPK(pK :number){ this.pK = pK ;}
    setCode(code: string){ this.code = code ;}
    setName(name: string){ this.name = name; }
    setActive(active: boolean){ this.active = active; }
    setLoginTemplate(template: Pagecms){ this.loginTemplate = template ;}
    setHomeTemplate(template: Pagecms){ this.homeTemplate = template ;}
    setModuleTemplate(template: Pagecms){ this.moduleTemplate = template ;}

    getPK(): number { return this.pK; }
    getCode() :string { return this.code ;}
    getName() :string { return this.name ;}
    getActive(): boolean { return this.active;}
    getLoginTemplate(): Pagecms {
        return this.loginTemplate;
    }
    getHomeTemplate(): Pagecms {
        return this.homeTemplate;
    }
    getModuleTemplate(): Pagecms {
        return this.moduleTemplate;
    }
}
