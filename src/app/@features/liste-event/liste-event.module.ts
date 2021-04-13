import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeEventRoutingModule } from './liste-event-routing.module';
import { ListeEventComponent } from './liste-event.component';


@NgModule({
  declarations: [
    ListeEventComponent
  ],
  imports: [
    CommonModule,
    ListeEventRoutingModule
  ]
})
export class ListeEventModule { }
