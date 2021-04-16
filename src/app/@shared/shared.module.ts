import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {COMPONENTS} from './component';
import { IonicModule } from '@ionic/angular';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicRatingComponentModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
