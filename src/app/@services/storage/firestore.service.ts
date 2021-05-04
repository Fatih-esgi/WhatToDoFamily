import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

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
        const filterChange = true;

        this._eventsCollection = this._fireStore.collection<any>('events', ref => {
          console.log("filter", filterItem);

          let query: firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;

          if (filterItem.category >= 1) { query = query.where('category', '==', filterItem.category) };
          if (filterItem.infoDog == true) { query = query.where('infoDog', '==', true) };
          if (filterItem.infoHandicap == true) { query = query.where('infoHandicap', '==', true) };
          if (filterItem.reqWeather != undefined) { query = query.where('reqWeather', '==', filterItem.reqWeather) };
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
            ), tap(
              toto => {
                console.log('toto', toto);
                console.log('filterc', filterChange);
              }
            )
          )
      })
    )
      .subscribe(
        newData => { this._EventList$.next(newData); }
      );
  }

  //filter update
  updateFilter(filter) {
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


  async getActuality() {
    let dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() + 10);
    console.log('-->',dateLimit);
    return await this._fireStore.collection<any>('events', ref =>
      ref.where('eventBegDate', '<=', dateLimit))
  }
}