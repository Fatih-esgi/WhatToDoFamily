import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OldeventRoutingModule } from './oldevent-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';
import { OldeventComponent } from './oldevent.component';


@NgModule({
  declarations: [
    OldeventComponent
  ],

  imports: [
    CommonModule,
    OldeventRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class OldeventModule { }
