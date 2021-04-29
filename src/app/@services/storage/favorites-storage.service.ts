import { Injectable, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const storageName = 'favourite';
const defaultList = [];

@Injectable({
  providedIn: 'root'
})
export class FavoritesStorageService {

  private favListe;


  constructor() {
    this.favListe = JSON.parse(localStorage.getItem(storageName)) || defaultList;
  }

  // get items
  get() {
    return [...this.favListe];
  }

  // add a new item
  post(item,value) {
    this.favListe.push({item,value});
    return this.update();
  }

  // // update an item //unused here in case i need them
  // put(item, changes) {
  //   Object.assign(this.favListe[this.findItemIndex(item)], changes);
  //   return this.update();
  // }

  // remove an item 
  destroy(item) {
    this.favListe.splice(this.findItemIndex(item), 1);
    return this.update();
  }
  
  //find item 
  findItem(item){
   return this.favListe.find(element => element == item);
   
  }

  //update storage
  private update() {
    localStorage.setItem(storageName, JSON.stringify(this.favListe));

    return this.get();
  }

  //findIndex of item
   findItemIndex(item) {
    return this.favListe.indexOf(item);
  }



}
