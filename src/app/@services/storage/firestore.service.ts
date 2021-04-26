import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  ///connexion in firestore & generating list as observable
  private _eventsCollection: AngularFirestoreCollection<any>;
  private _EventList$ = new BehaviorSubject([]);
  public EventList$ = this._EventList$.asObservable();

  ///filtres
  filteredEvents: any
  category: number;
  name: string;
  date: Date;
  city: string;
  range: number;
  weather: string;
  cost: number;
  dog: boolean;
  handicap: boolean;
  child: boolean;
  grandParents: boolean;

  ///liste des filtres actifs
  filters = {}

  constructor(private _fireStore: AngularFirestore) {
    this._eventsCollection = this._fireStore.collection<any>('events');

    this._eventsCollection.stateChanges(['added', 'modified'])
      .pipe(
        map(actions => actions.map(a => {
          const key = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { key, ...data };
        })
        )
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
    return combineLatest([
      this.EventList$
    ]).pipe(
      map(([eventList]) => {
        console.log('collection--->', eventList);
        this.applyFilters();
        return eventList
      })
    );
  }

  private applyFilters() {
    // this.filteredEvents = .filter(this.EventList$, .conforms(this.filters))
  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => val === rule;
  }

  filterBoolean(property: string, rule: any) {
    if (!rule) { this.removeFilter(property) }
    else { this.filters[property] = val => val === rule; }
  }

  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }
}
