import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meteoReq'
})
export class IconmeteoReqPipe implements PipeTransform {

  transform(value: string): string {
    let result;
    switch (true) {

      case value === "beau":
        result ="/assets/icons/weather/weather-ptnuage.svg"
        break;

      case value === "mauvais":
        result ="/assets/icons/weather/weather-pluie.svg"
        break;

      case value === "neige":
        result ="/assets/icons/weather/weather-neige.svg"
        break;
    
      default:
        break;
    }
    return result;
  }

}
