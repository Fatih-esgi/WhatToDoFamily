import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  // utiliser pour le stockage des données en provenance de la base de donnée
  items$: Observable<any[]>;

  private _EventList$ = new BehaviorSubject([]);
  public additiveList$ = this._EventList$.asObservable();
  

  constructor(private _fireStore: AngularFirestore) {
    this._fireStore
      .collection<any[]>('events')
      .stateChanges(['added', 'modified'])
      .pipe(
        map(actions => actions.map(a => {
          const key = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {key, ...data};
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
      this._EventList$
    ]).pipe(
      map(([eventList]) => {
        console.log('collection--->', eventList);
        return eventList
      })
    );
  }
}

