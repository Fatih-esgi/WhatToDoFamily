import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeEventRoutingModule } from './liste-event-routing.module';
import { ListeEventComponent } from './liste-event.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListeEventComponent
  ],
  imports: [
    CommonModule,
    ListeEventRoutingModule,
    IonicModule,
    SharedModule,
    FormsModule
  ]
})
export class ListeEventModule { }
