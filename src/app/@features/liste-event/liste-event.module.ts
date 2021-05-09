import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeEventRoutingModule } from './liste-event-routing.module';
import { ListeEventComponent } from './liste-event.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SearchModalComponent } from './search-modal/search-modal.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedDirectivesModule } from 'src/app/@directives/shared-directives.module';
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
    FormsModule,
    Ng2SearchPipeModule,
    SharedDirectivesModule
  ]
})
export class ListeEventModule { }
