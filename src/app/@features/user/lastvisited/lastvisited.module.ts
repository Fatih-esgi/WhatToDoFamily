import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LastvisitedRoutingModule } from './lastvisited-routing.module';
import { LastvisitedComponent } from './lastvisited.component';


@NgModule({
  declarations: [
    LastvisitedComponent
  ],
  imports: [
    CommonModule,
    LastvisitedRoutingModule
  ]
})
export class LastvisitedModule { }
