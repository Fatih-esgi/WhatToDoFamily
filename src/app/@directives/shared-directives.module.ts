import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarEffectDirective } from './toolbar-effect.directive';



@NgModule({
  declarations: [ToolbarEffectDirective],
  imports: [
    CommonModule
  ],
  exports:[ToolbarEffectDirective]
})
export class SharedDirectivesModule { }
