import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  // utiliser pour le stockage des données en provenance de la base de donnée
  items$: Observable<any[]>;

  private _eventsCollection: AngularFirestoreCollection<any>;
  private _userEventCollection: AngularFirestoreCollection<any>;
  private _EventList$ = new BehaviorSubject([]);
  public additiveList$ = this._EventList$.asObservable();


  constructor(
    private _fireStore: AngularFirestore, 
    public _auth: AngularFireAuth) {
    this._eventsCollection = this._fireStore.collection<any>('events');
    this._userEventCollection = this._fireStore.collection<any>('UsersEvents');
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
      this._EventList$
    ]).pipe(
      map(([eventList]) => {
        console.log('collection--->', eventList);
        return eventList
      })
    );
  }

 async sendToUserEvent(eventId:string): Promise<void> {
    const uid = (await this._auth.currentUser).uid;   
    console.log('-uid-->',uid,'evntID',eventId);

  //    await this._userEventCollection.add({

  //   name: value
  // });
}

}
