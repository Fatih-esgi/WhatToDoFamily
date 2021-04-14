import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventbookedRoutingModule } from './eventbooked-routing.module';
import { EventbookedComponent } from './eventbooked.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    EventbookedComponent
  ],
  imports: [
    CommonModule,
    EventbookedRoutingModule,
    IonicModule
  ]
})
export class EventbookedModule { }
