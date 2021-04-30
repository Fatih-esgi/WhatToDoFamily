import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  ///connexion in firestore & generating list & filters as observable
  private _eventsCollection: AngularFirestoreCollection<any>;
  private _EventList$: BehaviorSubject<any> = new BehaviorSubject([]);
  public EventList$: Observable<any> = this._EventList$.asObservable();

  private _filtersItems$: BehaviorSubject<any> = new BehaviorSubject({});;
  public filtersItems$: Observable<any> = this._filtersItems$.asObservable();


  constructor(private _fireStore: AngularFirestore) {


    this.filtersItems$.pipe(
      switchMap((filterItem) => {        
        this._eventsCollection = this._fireStore.collection<any>('events', ref => {
          // console.log("infoDog",filterItem.infoDog);
          // console.log("infoHandicap",filterItem.infoHandicap);
          // console.log("date",filterItem.date);
          // console.log("range",filterItem.range);
          // console.log("cost",filterItem.cost);
          // console.log("ville",filterItem.ville);
          // console.log("reqWeather",filterItem.reqWeather);
          console.log("category",filterItem.category);

          let query : firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;
          
          if (filterItem.category >= 1) { query = ref.where('category', '==', filterItem.category) };
          if (filterItem.infoDog == true) {  query =  ref.where('infoDog', '==', true) };
          if (filterItem.infoHandicap == true) {  query =  ref.where('infoHandicap', '==', true) };
          if (filterItem.reqWeather != undefined ) {  query =  ref.where('reqWeather', '==', filterItem.reqWeather) };
          return query
        }
        );

        return this._eventsCollection.stateChanges(['added', 'modified'])
          .pipe(
            map(actions => actions.map(a => {
              const key = a.payload.doc.id;
              const data = a.payload.doc.data();
              return { key, ...data };
            })
            )
          )
      })
    )
      .subscribe(
        newData => {
          const currentState = this._EventList$.value.filter(
            event => !newData.find(newevent => newevent.key === event.key)
          );
          const newState = [
            ...currentState,
            ...newData
          ];
          this._EventList$.next(newState);
        }
      );
  }

//filter update
  updateFilter(filter){
    this._filtersItems$.next(filter);    
  }

///GET FUCTIONS///

//getlistEvent
getliste$(): Observable<any[]> {
  return this.EventList$;
}

//get event by id
async getByID(id: string) {
  return await this._eventsCollection.doc(id).get().toPromise().then((doc) => {
    if (doc.exists) {
      return doc.data()
    } else {
      return ("No such document!")
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

}