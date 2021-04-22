import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meteoReq'
})
export class IconmeteoReqPipe implements PipeTransform {

  transform(value: string): string {
    let result;
    switch (true) {

      case value === "beau":
        result ="partly-sunny-outline"
        break;

      case value === "mauvais":
        result ="rainy-outline"
        break;

      case value === "neige":
        result ="snow-outline"
        break;
    
      default:
        break;
    }
    return result;
  }

}
