import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IonicModule } from '@ionic/angular';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import { ListEventComponent } from './list-event/list-event.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AddEditEventComponent,
    ListEventComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }