import { formatDate } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/@services/meteo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  categorySlideOpts = {
    initialSlide: 1,
    speed: 400
  };

  meteoData: {
    temp?: number;
    name?: string;
    imageUrl?: string;
    descr?: string;
  };
  date: any ;
  time:any = new Date();
  timer;
  activeCategory:string = "all";
  constructor(
    private _meteo: MeteoService,
    ) { 
      
    }

  async ngOnInit() {
    this.meteoData = await this._meteo.getMeteo();
    this.date = formatDate(new Date(), 'dd/MMMM/yyyy', 'en');
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }


  catChanged($event:any):void{
    console.log($event.detail.value);
    this.activeCategory = $event.detail.value;
  }
}
