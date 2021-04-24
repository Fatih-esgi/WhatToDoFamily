import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InjectJsonToFirestoreService {
  private _itemsCollection: AngularFirestoreCollection<any>;
  fakeEvents=[] //insert your JsonList HERE! 
  constructor(
    private _afs: AngularFirestore
  ) {
    this._itemsCollection = this._afs.collection<any>('events');
  }
//copy this to file !!! the send start on page load make it just 1 time!!!
// this._jsonToFirestore.saveobjFirestore() --- dont forget to import the service

  async saveobjFirestore(){
    console.log('menu',this.fakeEvents);
   await this.fakeEvents.forEach(obj => {
      
     this._itemsCollection.add({
        eventTitle: obj.eventTitle,
        category: obj.category,
        eventDescr:obj.eventDescr ,
        reqWeather: obj.reqWeather,
        dateBegin: obj.dateBegin,
        dateEnd: obj.dateEnd,
        eventAddress: obj.eventAddress,
        eventStates: obj.eventStates,
        eventCity: obj.eventCity,
        eventLat: obj.eventLat,
        eventLong: obj.eventLong,
        orgName: obj.orgName,
        orgAddress: obj.orgAddress,
        orgStates: obj.orgStates,
        orgCity: obj.orgCity,
        orgPhone: obj.orgPhone,
        orgMail: obj.orgMail,
        infoGen: obj.infoGen,
        infoTransp: obj.infoTransp,
        infoDog: obj.infoDog,
        infoHandicap: obj.infoHandicap,
        infoCost: obj.infoCost,
        media1: obj.media1,
        media2: obj.media2,
        media3: obj.media3,
        media4: obj.media4,
        media5: obj.media5,
        media6: obj.media6,
        ratings: [],
        users: []
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });
  }



}



