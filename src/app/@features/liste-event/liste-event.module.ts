import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeEventRoutingModule } from './liste-event-routing.module';
import { ListeEventComponent } from './liste-event.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SearchModalComponent } from './search-modal/search-modal.component';


@NgModule({
  declarations: [
    ListeEventComponent,
    SearchModalComponent
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
