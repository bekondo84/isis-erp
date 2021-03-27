export class Pagecms {

    private pK : number;
    private code: string;
    private name: string;
    private cssStyle: string;
    private htmlTemplate: string;

   constructor( pK: number,  code: string
       ,  name: string,  cssStype: string
       ,  htmlTemplate: string ){

           this.pK = pK;
           this.code = code;
           this.name = name;
           this.cssStyle = cssStype;
           this.htmlTemplate = htmlTemplate;
   }

   getPK(){return this.pK}
   setPK(key: number){this.pK = key;}

   getCode(){ return this.code; }
   setCode(value: string){ this.code = value; }

   getName(){ return this.name; }
   setName(value: string){ this.name = value ;}

   getCssStyle(){ return this.cssStyle ;}
   setCssStyle(value: string){ this.cssStyle = value; }

   getHtmlTemplate(){ return this.htmlTemplate; }
   setHtmlTemplate(value: string){ this.htmlTemplate = value; }
    
   static getPage(value : any) : Pagecms{
      let page : Pagecms = new Pagecms(value.pK,value.code,value.name,value.cssStyle,value.htmlTemplate);

      return page ;
   }
}
