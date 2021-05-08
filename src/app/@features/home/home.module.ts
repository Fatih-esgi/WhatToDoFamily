import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/@shared/shared.module';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import { WeatherDBFilterPipe } from 'src/app/@shared/pipes/weather-dbfilter.pipe';
import { SharedDirectivesModule } from 'src/app/@directives/shared-directives.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    SharedModule,
    IonicRatingComponentModule,
    SharedDirectivesModule
  ],
  providers:[WeatherDBFilterPipe]
})
export class HomeModule { }
