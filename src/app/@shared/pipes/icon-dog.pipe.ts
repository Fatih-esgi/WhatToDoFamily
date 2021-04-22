import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconDog'
})
export class IconDogPipe implements PipeTransform {

  transform(value: boolean): string {
    let result;
    switch (true) {
      case value === true:
        result ="caret-up-outline"
        break;
      case value === false:
        result ="caret-down-outline"
        break;
    
      default:
        break;
    }
    return result;
  }

}
