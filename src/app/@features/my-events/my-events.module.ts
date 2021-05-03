import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyEventsRoutingModule } from './my-events-routing.module';
import { MyEventsComponent } from './my-events.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { NgCalendarModule  } from 'ionic2-calendar';


import { registerLocaleData } from '@angular/common';
import localFRCH from '@angular/common/locales/fr-CH';
import { ListeComponent } from './liste/liste.component';
import { CalendrarViewComponent } from './calendrar-view/calendrar-view.component';
registerLocaleData(localFRCH);

@NgModule({
  declarations: [
    MyEventsComponent,
    ListeComponent,
    CalendrarViewComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-CH' }
  ],
  imports: [
    CommonModule,
    MyEventsRoutingModule,
    SharedModule,
    IonicModule,
    NgCalendarModule,
    FormsModule
  ]  
})
export class MyEventsModule { }
