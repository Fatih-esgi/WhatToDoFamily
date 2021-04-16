import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LastvisitedRoutingModule } from './lastvisited-routing.module';
import { LastvisitedComponent } from './lastvisited.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';


@NgModule({
  declarations: [
    LastvisitedComponent
  ],
  imports: [
    CommonModule,
    LastvisitedRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class LastvisitedModule { }
