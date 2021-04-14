import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyratingRoutingModule } from './myrating-routing.module';
import { MyratingComponent } from './myrating.component';


@NgModule({
  declarations: [
    MyratingComponent
  ],
  imports: [
    CommonModule,
    MyratingRoutingModule
  ]
})
export class MyratingModule { }
