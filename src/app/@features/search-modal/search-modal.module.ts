import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModalComponent } from './search-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SearchModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
})
export class SearchModalModule { }
