import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OWMService {

  appId: string = 'e69064d639a2a2cd2f257cb59c476c6c';
  url: string =  'https://api.openweathermap.org/data/2.5/weather';

  constructor(
    private _http: HttpClient
  ) {}

  async getCurrentWeather(data: {lat: number, long: number}): Promise<any> {
    const queryParams = `?lat=${data.lat}&lon=${data.long}&lang=fr&appid=${this.appId}&units=metric`
    const response = await this._http.get(this.url + queryParams).toPromise();
    return response;
  }
}
