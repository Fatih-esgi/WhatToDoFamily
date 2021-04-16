import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventbookedRoutingModule } from './eventbooked-routing.module';
import { EventbookedComponent } from './eventbooked.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';


@NgModule({
  declarations: [
    EventbookedComponent
  ],
  imports: [
    CommonModule,
    EventbookedRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class EventbookedModule { }
