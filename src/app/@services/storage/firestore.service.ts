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
  public filteredList;


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
        // console.log('collection--->', eventList);
        return eventList
      })
    );
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
      
     return this.EventList$.toPromise().then((fltredEvent)=>{
      fltredEvent.filter(event => event.category === catid);
     })
     
    }

  addToRegistredEvent() {

  }
}
