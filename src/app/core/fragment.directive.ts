import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]'
})
export class FragmentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
