import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'publicCible'
})
export class PublicCiblePipe implements PipeTransform {

  transform(value: string): string {
    let result;
    switch (true) {

      case value === "enfant":
        result ="/assets/icons/kid.svg"
        break;

      case value === "adulte":
        result ="/assets/icons/aunt.svg"
        break;

      case value === "vieux":
        result ="/assets/icons/grandparents.svg"
        break;
    
      default:
        break;
    }
    return result;
  }

}