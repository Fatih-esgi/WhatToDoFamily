import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyratingRoutingModule } from './myrating-routing.module';
import { MyratingComponent } from './myrating.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';


@NgModule({
  declarations: [
    MyratingComponent
  ],
  imports: [
    CommonModule,
    MyratingRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class MyratingModule { }
