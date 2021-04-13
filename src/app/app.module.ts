import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { EventDetailComponent } from './@features/event-detail/event-detail.component';
import { HeaderComponent } from './@shared/component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    EventDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
