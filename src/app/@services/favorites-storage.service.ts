import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core'
@Injectable({
  providedIn: 'root'
})
export class FavoritesStorageService {

  listeFav:any;

  constructor() { 
    this.listeFav= [];
    
  }


   setFavorite(id) {
     this.listeFav.push(id)
    
    // await Storage.set({
    //   key: 'favEvents',
    //   value: JSON.stringify({
    //     ids: this.listeFav
    //   })
    // });
     console.log(this.listeFav);

  }

  async removeFavorite(id) {
    const index = this.listeFav.indexOf(id);
    if (index > -1) {
      this.listeFav.splice(index, 1);
    }
  }



  async getListEvent() {
    const ret = await Storage.get({ key: 'favEvents' });
    const favEventList = JSON.parse(ret.value);
    return { favEventList }
  }
}
