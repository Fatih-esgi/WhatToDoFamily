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
    const meteoData = await this._apiServie.getCurrentWeather(pos);
    console.log(meteoData);
    
    return {
      temp: meteoData.main.temp,
      name: meteoData.name,
      imageUrl: `http://openweathermap.org/img/wn/${meteoData.weather[0].icon}@2x.png`,
      descr: meteoData.weather[0].description 
    };
  }
}
