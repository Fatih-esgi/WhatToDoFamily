import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDetailRoutingModule } from './event-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';
import { IonicRatingComponentModule } from 'ionic-rating-component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventDetailRoutingModule,
    IonicModule,
    IonicRatingComponentModule
  ]
})
export class EventDetailModule { }
