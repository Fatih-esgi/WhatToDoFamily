import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconHandicap'
})
export class IconHandicapPipe implements PipeTransform {

  transform(value: boolean): string {
    let result;
    switch (true) {
      case value === true:
        result ="/assets/icons/handicap.svg"
        break;
      case value === false:
        result ="/assets/icons/nohandicap.svg"
        break;
    
      default:
        break;
    }
    return result;
  }
}
