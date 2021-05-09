import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catColors'
})
export class CatColorsPipe implements PipeTransform {

  transform(value: number): string {
    let result;
    switch (true) {
      case value === 1:
        result ="#6fce6f"
        break;
      case value === 2:
        result ="#27d5dd"
        break;
      case value === 3:
        result ="#c44ecc"
        break;
      case value === 4:
        result ="#d04343"
        break;
      case value === 5:
        result ="#ece633"
        break;
    
      default:
        break;
    }
    return result;
  }

}
