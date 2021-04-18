import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDetailRoutingModule } from './event-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import { EventDetailComponent } from './event-detail.component';


@NgModule({
  declarations: [
    EventDetailComponent
  ],
  imports: [
    CommonModule,
    EventDetailRoutingModule,
    IonicModule,
    IonicRatingComponentModule
  ]
})
export class EventDetailModule { }
