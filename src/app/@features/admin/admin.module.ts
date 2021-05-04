import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IonicModule } from '@ionic/angular';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import { ListEventComponent } from './list-event/list-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { TakePictureComponent } from './take-picture/take-picture.component'

@NgModule({
  declarations: [
    AdminComponent,
    AddEditEventComponent,
    ListEventComponent,
    TakePictureComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ]
})
export class AdminModule { }