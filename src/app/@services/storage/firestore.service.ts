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
          if (!!filterItem.reqWeather) { query = query.where('reqWeather', 'array-contains', filterItem.reqWeather) };
          if (!!filterItem.ville) { query = query.where('eventStates', '==', filterItem.ville) };
          if (!!filterItem.cost) { query = query.where('infoCost', '<=', filterItem.cost) };    //bug entre cost et start date dû inegalité 2x "<="
          if (!!filterItem.date) { query = query.where('eventStartDate', '<=', filterItem.date) };  ///imposiible de query deux inégalité faire filtre pour date fin coté client
          ///range a faire ici///

          return query
        }
        );

        return this._eventsCollection.stateChanges(['added', 'modified'])
          .pipe(
            map(actions => actions.map(a => {
              const id = a.payload.doc.id;
              const data = a.payload.doc.data();
              return { id, ...data };
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

  getListFromWeather(weather) {
    return this._fireStore.collection<any>(
      'events', // nom de lacollectoin (ref)
      ref => ref.where('reqWeather', 'array-contains', weather) // query firebase sur la réféernce choisi
    );
  }

  getListActu(date) {
    const dateNow = date;
    const year = dateNow.getFullYear()
    const month = dateNow.getMonth()
    const day = dateNow.getDate()

    // Creating a new Date (with the delta)
    const finalDate = new Date(year, month, day + 30)
    console.log(finalDate);

    return this._fireStore.collection<any>(
      'events', // nom de lacollectoin (ref)
      ref => ref.where('eventEndDate', '<=', finalDate)// query firebase sur la réféernce choisi
    );
  }


}