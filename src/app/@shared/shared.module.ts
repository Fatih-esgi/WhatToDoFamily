import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {COMPONENTS} from './component';
import { IonicModule } from '@ionic/angular';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import { RouterModule } from '@angular/router';
import { IconDogPipe } from './pipes/icon-dog.pipe';
import { IconmeteoReqPipe } from './pipes/iconmeteo-req.pipe';
import { IconHandicapPipe } from './pipes/icon-handicap.pipe';



@NgModule({
  declarations: [
    ...COMPONENTS,
    IconDogPipe,
    IconmeteoReqPipe,
    IconHandicapPipe
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
