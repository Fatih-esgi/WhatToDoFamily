import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDetailRoutingModule } from './event-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import { EventDetailComponent } from './event-detail.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { RegisterEventComponent } from './register-event/register-event.component';
import { FormsModule } from '@angular/forms';
import { RateModalComponent } from './rate-modal/rate-modal.component';


@NgModule({
  declarations: [
    EventDetailComponent,
    RegisterEventComponent,
    RateModalComponent,
  ],
  imports: [
    CommonModule,
    EventDetailRoutingModule,
    IonicModule,
    IonicRatingComponentModule,
    SharedModule,
    FormsModule,
  ]
})
export class EventDetailModule { }
