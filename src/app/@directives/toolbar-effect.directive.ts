import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appToolbarEffect]'
})
export class ToolbarEffectDirective implements OnInit {

  @Input('appToolbarEffect') toolbar: any;

  constructor(private domCtrl: DomController) { }

  ngOnInit() {
    this.toolbar = this.toolbar.el
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    let scrollTop = Math.ceil($event.detail.scrollTop);
    if (scrollTop >= 255) {
      scrollTop = 255;
    }
    
    const hexDist = scrollTop.toString(16);
    
    this.domCtrl.write(() => {
        this.toolbar.style.setProperty('--background', `#24262B${hexDist}`)      

    })
  }
}
