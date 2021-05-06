import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private _singleEvent: AngularFirestoreCollection<any>;
  singleEvent$: Observable<any[]>;
  ///connexion in firestore & generating list & filters as observable
  private _eventsActus: AngularFirestoreCollection<any>;
  actus$: Observable<any[]>;

  private _eventsCollection: AngularFirestoreCollection<any>;
  private _EventList$: BehaviorSubject<any> = new BehaviorSubject([]);
  public EventList$: Observable<any> = this._EventList$.asObservable();

  private _filtersItems$: BehaviorSubject<any> = new BehaviorSubject({});;
  public filtersItems$: Observable<any> = this._filtersItems$.asObservable();


  constructor(private _fireStore: AngularFirestore) {

    ///collection de la page evenements
    this.filtersItems$.pipe(
      switchMap((filterItem) => {
        const filterChange = true;

        this._eventsCollection = this._fireStore.collection<any>('events', ref => {
          console.log("filter", filterItem);

          let query: firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;

          if (filterItem.category >= 1) { query = query.where('category', '==', filterItem.category) };
          if (filterItem.infoDog == true) { query = query.where('infoDog', '==', true) };
          if (filterItem.infoHandicap == true) { query = query.where('infoHandicap', '==', true) };
          if (!!filterItem.reqWeather) { query = query.where('reqWeather', '==', filterItem.reqWeather) };
          //si range ou cost --> ref where
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
        newData => { this._EventList$.next(newData); }
      );//end collection page events
      

  }


  //filter update -> ajouter des les valeurs des élements filtres à la liste
  updateFilter(filter) {
    this._filtersItems$.next(filter);
  }


  ///GET FUCTIONS///

  //getlistEvent
  getliste$(): Observable<any[]> {
    return this.EventList$;
  }

  //get event by id
  // async getByID(id: string) {
  //   return await this._eventsCollection.doc(id).get().toPromise().then((doc) => {
  //     if (doc.exists) {
  //       return doc.data()
  //     } else {
  //       return ("No such document!")
  //     }
  //   }).catch((error) => {
  //     console.log("Error getting document:", error);
  //   });
  // }

 
  getWeather(weather) {
    return this._fireStore.collection<any>(
      'events', // nom de lacollectoin (ref)
      ref => ref.where('reqWeather', '==', weather) // query firebase sur la réféernce choisi
    );
  }


}