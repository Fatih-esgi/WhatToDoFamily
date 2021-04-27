import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {COMPONENTS} from './component';
import { IonicModule } from '@ionic/angular';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import { RouterModule } from '@angular/router';
import { IconDogPipe } from './pipes/icon-dog.pipe';
import { IconmeteoReqPipe } from './pipes/iconmeteo-req.pipe';
import { IconHandicapPipe } from './pipes/icon-handicap.pipe';
import { CatColorsPipe } from './pipes/cat-colors.pipe';
import { WeatherImagePipe } from './pipes/weather-image.pipe';
import { WeatherDescriptionPipe } from './pipes/weather-description.pipe';
import { CatTitlePipe } from './pipes/cat-title.pipe';
import { WeatherIconsPipe } from './pipes/weather-icons.pipe';



@NgModule({
  declarations: [
    ...COMPONENTS,
    IconDogPipe,
    IconmeteoReqPipe,
    IconHandicapPipe,
    CatColorsPipe,
    WeatherImagePipe,
    WeatherDescriptionPipe,
    CatTitlePipe,
    WeatherIconsPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicRatingComponentModule,
    RouterModule,
  ],
  exports: [
    ...COMPONENTS,
    IconDogPipe,
    IconmeteoReqPipe,
    IconHandicapPipe,
    CatColorsPipe,
    WeatherImagePipe,
    WeatherDescriptionPipe,
    CatTitlePipe,
    WeatherIconsPipe
  ]
})
export class SharedModule { }
