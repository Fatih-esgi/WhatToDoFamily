import { formatDate } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/@services/meteo/meteo.service';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1.2,
      spaceBetween: 10,
      freeMode: true,
    
  };

  meteoData: {
    temp?: number;
    name?: string;
    imageUrl?: string;
    descr?: string;
  };
  date: any;
  time: any = new Date();
  timer;

  max = 10;
  min = 0;
  listeEvent;
  constructor(
    private _meteo: MeteoService,
    private _afs : FirestoreService,
  ) {

  }

  async ngOnInit() {
    this.meteoData = await this._meteo.getMeteo();
    this.date = formatDate(new Date(), 'dd/MMMM/yyyy', 'en');
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.listeEvent = await this._afs.getliste$();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  async loadData(event) {
    this.max = this.max + 10;
    event.target.complete();
  }
}
