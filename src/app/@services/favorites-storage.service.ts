import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core'
@Injectable({
  providedIn: 'root'
})
export class FavoritesStorageService {

  getFavData: any;
  listeFav:any[];

  constructor() { 
    this.listeFav=[]
    
  }


  async setFavorite(id) {
    await this.listeFav.push(id)
    
    await Storage.set({
      key: 'favEvents',
      value: JSON.stringify({
        ids: this.listeFav
      })
    });
    await console.log(this.listeFav);

  }

  async getListEvent() {
    const ret = await Storage.get({ key: 'favEvents' });
    const favEventList = JSON.parse(ret.value);
    return { favEventList }
  }
}
