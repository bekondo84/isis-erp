import { Navigation } from './navigation';

export class Module {
    private name: string ;
    private version: string ;
    private author: string ;
    private sequence: number;
    private summary: string;
    private description: string;
    private category: string;
    private website: string;
    private install: boolean;
    private navigations: Navigation[];

    constructor(name: string ,version: string, author: string ,sequence:number
        , summary:string, description: string, category:string ,website: string ,install :boolean){
            this.name = name;
            this.version = version;
            this.author = author;
            this.sequence = sequence;
            this.summary = summary;
            this.description = description;
            this.category = category;
            this.website = website;
            this.install = install;
            this.navigations = new Array();
        }
    getName(){return this.name;}
    getVersion(){ return this.version ;}
    getAuthor(){ return this.author; }
    getSequence(){ return this.sequence;}
    getSummary(){ return this.summary; }
    getDescription(){return this.description ;}
    getCategory(){ return this.category ;}
    getWebsite(){ return this.website; }
    getInstall(){ return this.install ; }
    getNavigations(){ return this.navigations ; }

    static getInstance(value: any){
        var module = new Module(value.name, value.version ,value.author, value.sequence, value.summary, value.description, value.category, value.website, value.initial);
        if(value.navigations != null){
            value.navigations.forEach(element => {
               module.getNavigations().push(Navigation.getNavigation(element));
            });
        }
        return module;
    }
}
