import { Injectable, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
const { Storage } = Plugins;

const storageName = 'favourite';
const defaultList = [];

@Injectable({
  providedIn: 'root'
})
export class FavoritesStorageService {

  private _favList: BehaviorSubject<any> = new BehaviorSubject(null);
  public favListe$: Observable<any> = this._favList.asObservable();

  constructor() {
    this.favListe$ = JSON.parse(localStorage.getItem(storageName)) || defaultList;
  }

  // get items
  get() {
   return  this.favListe$.toPromise()
      .then(r => [...r])
    
  }

  // add a new item
  post(item) {
    this.favListe$.pipe(
      first())
      .toPromise()
      .then(r =>
        r.push(item))
    return this.update();
  }

  // // update an item //unused here in case i need them
  // put(item, changes) {
  //   Object.assign(this.favListe[this.findItemIndex(item)], changes);
  //   return this.update();
  // }

  // remove an item

  destroy(item) {
    this.favListe$.pipe(
      first())
      .toPromise()
      .then(r =>
        r.splice(this.findItemIndex(item), 1))
    return this.update();
  }

  findItem(item) {
    return this.favListe$.pipe(
      first())
      .toPromise()
      .then(r =>
        r.find(element => element == item)
        )

  }
  private update() {
    localStorage.setItem(storageName, JSON.stringify(this.favListe$));

    return this.get();
  }

  findItemIndex(item) {
    return this.favListe$.pipe(
      first())
      .toPromise()
      .then(r => 
        r.indexOf(item)
        )
  }



}
