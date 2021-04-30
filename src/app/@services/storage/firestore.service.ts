import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  ///connexion in firestore & generating list as observable
  private _eventsCollection: AngularFirestoreCollection<any>;
  private _EventList$: BehaviorSubject<any> = new BehaviorSubject([]);
  public EventList$: Observable<any> = this._EventList$.asObservable();
  public filteredList;
  private _filtersItems$: BehaviorSubject<any> = new BehaviorSubject({});;
  public filtersItems$: Observable<any> = this._filtersItems$.asObservable();


  constructor(private _fireStore: AngularFirestore) {


    this.filtersItems$.pipe(
      switchMap(filteritem => {
        this._eventsCollection = this._fireStore.collection<any>('events', ref => {
          //ajouter des filtres ici if filter = ---> where
          return ref
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

  getliste$(): Observable<any[]> {
    return this.EventList$;
  }

  async getByID(id: string) {
    return await this._eventsCollection.doc(id).get().toPromise().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data()
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return ("No such document!")
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  getCategory$(catid) {

    return this.EventList$.toPromise().then((fltredEvent) => {
      fltredEvent.filter(event => event.category === catid);
    })

  }

  addToRegistredEvent() {

  } 
  updateFilter(filter){
    this._filtersItems$.next(filter);
  }
}
