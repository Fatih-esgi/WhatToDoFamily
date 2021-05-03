import { Injectable } from "@angular/core";
import { GeoService } from "../gelocation/geo.service";
import { OWMService } from "./owm.service";

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  meteoData: any;

  constructor(
    private _geoService: GeoService,
    private _apiServie: OWMService
  ) {

  }

  async getMeteo() {
    const pos = await this._geoService.getPosition();
    const meteoData = await this._apiServie.getDailyWeather(pos);
    console.log('daily',meteoData);
    
    return {
      currenttemp: meteoData.current.temp,
      curentid: meteoData.current.weather[0].id,
      curentIcon: `http://openweathermap.org/img/wn/${meteoData.current.weather[0].icon}@2x.png`,
      dailyID: meteoData.daily[0].weather[0].id,
      dailyIcon: `http://openweathermap.org/img/wn/${meteoData.daily[0].weather[0].icon}@2x.png`,

    };
  }
}
