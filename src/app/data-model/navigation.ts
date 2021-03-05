import { CommonModule } from '@angular/common';

export class Navigation {
    private code: string;
    private activate: boolean;
    private icon: string;
    private label: string;
    private position: number;
    private level: string;
    private endPoint: string;
    private type: string;
    private viewMode: string;
    private modal: boolean;
    private nodes :Navigation[]

    constructor(code: string, activate:boolean, icon:string, label:string, position:number,level:string){
        this.code = code ;
        this.activate = activate;
        this.icon = icon;
        this.label = label;
        this.position = position;
        this.level = level;
        this.nodes = new Array();
    }

    getCode(){ return this.code ;}
    getActivate(){ return this.activate ;}
    getIcon(){ return this.icon ;}
    getLabel(){ return this.label ;}
    getPosition(){ return this.position ;}
    getLevel(){ return this.level; }
    getEndpoint(){ return this.endPoint; }
    setEndPoint(endPoint: string){ this.endPoint = endPoint; }
    getType(){ return this.type ; }
    setType(type: string){ this.type = type; }
    getViewMode(){ return this.viewMode; }
    setViewMode(viewMode: string){ this.viewMode = viewMode; }
    getModal(){ return this.modal ;}
    setModal(modal: boolean){ this.modal = modal ;}
    getNodes(){ return this.nodes; }

    static getNavigation(node: any){
        let nav = new Navigation(node.code, node.activate,node.icon,node.label,node.position,node.level);        
        nav.setEndPoint(node.endPoint);
        nav.setType(node.type);
        nav.setViewMode(node.viewMode);
        nav.setModal(node.modal);

        if(node.navigations != null){
            node.navigations.forEach(element => {
                nav.nodes.push(this.getNavigation(element));
            });
        }
        return nav; 
    }
}
