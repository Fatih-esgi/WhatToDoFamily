import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyEventsRoutingModule } from './my-events-routing.module';
import { MyEventsComponent } from './my-events.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    MyEventsComponent
  ],
  imports: [
    CommonModule,
    MyEventsRoutingModule,
    SharedModule,
    IonicModule
  ]
})
export class MyEventsModule { }
