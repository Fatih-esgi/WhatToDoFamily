import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcons'
})
export class WeatherIconsPipe implements PipeTransform {

  transform(value: number): string {
    let result;
    switch (true) {
      case value === 800:
        result = "/assets/icons/weather/weather-soleil.svg"
        break;
      case value === 801:
        result = "/assets/icons/weather/weather-ptnuage.svg"
        break;
      case value === 802:
        result = "/assets/icons/weather/weather-nuage.svg"
        break;
      case value === 803:
      case value === 804:
        result = "/assets/icons/weather/weather-grnuage.svg"
        break;

      case value === 200:
      case value === 201:
      case value === 202:
      case value === 210:
      case value === 211:
      case value === 212:
      case value === 221:
      case value === 230:
      case value === 231:
      case value === 232:
        result = "/assets/icons/weather/weather-orage.svg"
        break;

      case value === 300:
      case value === 301:
      case value === 302:
      case value === 310:
      case value === 311:
      case value === 312:
      case value === 313:
      case value === 314:
      case value === 321:
        result = "/assets/icons/weather/weather-pluie.svg"
        break;

      case value === 500:
      case value === 501:
      case value === 502:
      case value === 503:
      case value === 504:
        result = "/assets/icons/weather/weather-pluie.svg"
        break;

      case value === 511:
        result = "/assets/icons/weather/weather-plgivre.svg"
        break;

      case value === 520:
      case value === 521:
      case value === 522:
      case value === 531:
        result = "/assets/icons/weather/weather-grossepluie.svg"
        break;

      case value === 600:
      case value === 601:
      case value === 602:
      case value === 611:
      case value === 612:
      case value === 613:
      case value === 615:
      case value === 616:
      case value === 620:
      case value === 621:
      case value === 622:
        result = "/assets/icons/weather/weather-neige.svg"
        break;

      case value === 701:
      case value === 711:
      case value === 721:
      case value === 731:
      case value === 741:
      case value === 751:
      case value === 761:
      case value === 762:
      case value === 771:
      case value === 781:
        result = "/assets/icons/weather/weather-warn.svg"
        break;

      default: "/assets/icons/weather/alert-circle-outline"
        break;
    }
    return result;
  }

}
