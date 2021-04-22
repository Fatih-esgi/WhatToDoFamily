import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconHandicap'
})
export class IconHandicapPipe implements PipeTransform {

  transform(value: boolean): string {
    let result;
    switch (true) {
      case value === true:
        result ="heart-outline"
        break;
      case value === false:
        result ="heart-dislike-outline"
        break;
    
      default:
        break;
    }
    return result;
  }
}
