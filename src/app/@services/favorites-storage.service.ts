import { Injectable } from '@angular/core';
import {Storage} from '@capacitor/core'
@Injectable({
  providedIn: 'root'
})
export class FavoritesStorageService {

 getFavData:any;

  constructor() { }

async setFavorite(id) {
  await Storage.set({
    key: 'favEvents',
    value: JSON.stringify({
      ids: {
        id:id
      },
    }) 
  });
}

async getObject() {
  const ret = await Storage.get({ key: 'id' });
  const favEventList = JSON.parse(ret.value);
  return {favEventList}
}
}
