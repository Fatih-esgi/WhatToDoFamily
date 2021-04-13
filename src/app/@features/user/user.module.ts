import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { IonicModule } from '@ionic/angular';
import { OldeventComponent } from './oldevent/oldevent.component';


@NgModule({
  declarations: [
    UserComponent,
    OldeventComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IonicModule
  ]
})
export class UserModule { }
