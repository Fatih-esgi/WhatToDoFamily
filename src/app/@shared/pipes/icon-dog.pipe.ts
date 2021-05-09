import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconDog'
})
export class IconDogPipe implements PipeTransform {

  transform(value: boolean): string {
    let result;
    switch (true) {
      case value === true:
        result ="/assets/icons/dog.svg"
        break;
      case value === false:
        result ="/assets/icons/nodog.svg"
        break;
    
      default:
        break;
    }
    return result;
  }

}
