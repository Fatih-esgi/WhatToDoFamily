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
  //opt for slider actus
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1.3,
    spaceBetween: 10,
    freeMode: true,

  };
  //data from meteo service
  meteoData: {
    currenttemp: number;
    curentid: number;
    curentIcon: string;
    dailyID: number;
    dailyIcon: string;
  };

  //data Current Date
  date: Date = new Date();
  time: Date = new Date();
  timer: any;

  //infinite scroll limits
  max: number = 10;
  min: number = 0;

  //generated list event (meteo), Actus
  listeEvent: Array<any>;
  listeActus: Array<any>;

  //converted meteo id -> weather category from DB
  weatherDBString: string;


  constructor(
    private _meteo: MeteoService,
    private _afs: FirestoreService,
    private _weatherDBPipe: WeatherDBFilterPipe
  ) { }

  async ngOnInit() {
    //get Météo
    this.meteoData = await this._meteo.getMeteo();

    //timeNow   
    this.timer = setInterval(() => { this.time = new Date(); }, 1000);

    //transform daily meteo.id to DB weather category
    this.weatherDBString = this.transformWeather(this.meteoData.dailyID);

    //get events -> filter by meteo from DB 
    this._afs.getListFromWeather(this.weatherDBString).snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
          ({
            id: c.payload.doc.id,
            ...c.payload.doc.data()
          })
          )
        )
      )
      .subscribe(data => {
        return this.listeEvent = [...data]
      });

    //get events -> filter by date from DB 
    this._afs.getListActu(this.date).snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
          ({
            id: c.payload.doc.id,
            ...c.payload.doc.data()
          })
          )
        )
      )
      .subscribe(data => {
        return this.listeActus = [...data]
      });

  };

  ngOnDestroy() {
    // clear timer interval
    clearInterval(this.timer); 
  }

  // -------------------------called functions-------------------------


  //function transform meteoID to DB weather category
  transformWeather(weather: number) {
    return this._weatherDBPipe.transform(weather);
  }

  //infinite scroll function
  async loadData(event) {
    this.max = this.max + 10;
    event.target.complete();
  }
}
