import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const storageName = 'favourite';
const defaultList = [];

@Injectable({
  providedIn: 'root'
})
export class FavoritesStorageService {

  private _favList: BehaviorSubject<any> = new BehaviorSubject(defaultList);
  public favListe$: Observable<any> = this._favList.asObservable();

  constructor() {
    const data = JSON.parse(localStorage.getItem(storageName)) || defaultList;
    this._favList.next(data)
  }

  // get items
  get() {
    console.log(this.favListe$);
    
    return this.favListe$
    }

  // add a new item
  post(item,value) {
    const items = this._favList.value; 
    this._favList.next(
      [{item,value},...items]
    )
    return this.update();
  }

  // // update an item //unused here in case i need them
  // put(item, changes) {
  //   Object.assign(this.favListe[this.findItemIndex(item)], changes);
  //   return this.update();
  // }

  // remove an item

  destroy(item) {
    const updatedList = this._favList.value.splice(this.findItemIndex(item), 1);
    this._favList.next(updatedList)
    return this.update();
  }

  findItem(item$){
    return this._favList.value.find(item => item.item == item$);  
   }

  private update() {
    localStorage.setItem(storageName, JSON.stringify(this._favList.value));
    return this.get();
  }

  findItemIndex(item) {
    return this._favList.value.indexOf(item.item);
  }



}
