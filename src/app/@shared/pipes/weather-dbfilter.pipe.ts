import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherDBFilter'
})
export class WeatherDBFilterPipe implements PipeTransform {

 
  transform(value: number): string {
    let result;
    switch (true) {
      case value === 800:
      case value === 801:
      case value === 802:
      case value === 803:
      case value === 804:
        result = "beau"
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
      case value === 300:
      case value === 301:
      case value === 302:
      case value === 310:
      case value === 311:
      case value === 312:
      case value === 313:
      case value === 314:
      case value === 321:
      case value === 500:
      case value === 501:
      case value === 502:
      case value === 503:
      case value === 504:
      case value === 511:
      case value === 520:
      case value === 521:
      case value === 522:
      case value === 531:
        result = "mauvais"
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
        result = "neige"
        break;
      default: "beau"
        break;
    }
    return result;
  }

}
