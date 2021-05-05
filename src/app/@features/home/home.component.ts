import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MeteoService } from 'src/app/@services/meteo/meteo.service';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';
import { WeatherDBFilterPipe } from '../../@shared/pipes/weather-dbfilter.pipe'
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
    currenttemp: number;
    curentid: number;
    curentIcon: string;
    dailyID: number;
    dailyIcon: string;
  };

  date: any;
  time: any = new Date();
  timer;

  max = 10;
  min = 0;
  listeEvent;

  weatherToDayString;
  constructor(
    private _meteo: MeteoService,
    private _afs: FirestoreService,
    private _weatherDBPipe: WeatherDBFilterPipe
  ) {

  }

  async ngOnInit() {
    this.meteoData = await this._meteo.getMeteo();
    this.date = formatDate(new Date(), 'dd/MMMM/yyyy', 'en');
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.weatherToDayString = this.transformDate(this.meteoData.dailyID)

    await this._afs.getWeather(await this.weatherToDayString).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log(data);

      return this.listeEvent = [...data]

    });
  };

  transformDate(weather) {
    return this._weatherDBPipe.transform(weather);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  async loadData(event) {
    this.max = this.max + 10;
    event.target.complete();
  }
}
