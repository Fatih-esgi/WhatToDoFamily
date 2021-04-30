import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catTitle'
})
export class CatTitlePipe implements PipeTransform {

  transform(value: number): string {
    let result;
    switch (true) {
      case value === 0:
        result ="Tous les événements"
        break;
      case value === 1:
        result ="Sortir"
        break;
      case value === 2:
        result ="Découvrir"
        break;
      case value === 3:
        result ="S'amuser"
        break;
      case value === 4:
        result ="Manger"
        break;
      case value === 5:
        result ="Se détendre"
        break;
    
      default: "cccvccc"
        break;
    }
    return result;
  }

}
