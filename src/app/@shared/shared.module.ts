import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {COMPONENTS} from './component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
