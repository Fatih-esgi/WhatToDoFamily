import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { IonicModule } from '@ionic/angular';
import { OldeventComponent } from './oldevent/oldevent.component';
import { SharedModule } from 'src/app/@shared/shared.module';


@NgModule({
  declarations: [
    UserComponent,
    OldeventComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class UserModule { }
