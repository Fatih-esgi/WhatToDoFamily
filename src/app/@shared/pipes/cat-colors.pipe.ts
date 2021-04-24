import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catColors'
})
export class CatColorsPipe implements PipeTransform {

  transform(value: number): string {
    let result;
    switch (true) {
      case value === 1:
        result ="red"
        break;
      case value === 2:
        result ="yellow"
        break;
      case value === 3:
        result ="blue"
        break;
      case value === 4:
        result ="green"
        break;
      case value === 5:
        result ="purple"
        break;
    
      default:
        break;
    }
    return result;
  }

}
