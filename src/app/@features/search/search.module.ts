import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { IonicModule } from '@ionic/angular';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    SearchComponent,
    SearchFiltersComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class SearchModule { }
