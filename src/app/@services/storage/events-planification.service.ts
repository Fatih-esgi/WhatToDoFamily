import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { EventToPlanification } from 'src/app/@interfaces/event-to-planification';

@Injectable({
  providedIn: 'root'
})
export class EventsPlanificationService {
  userID:string;

  private dbPath = '/eventsPlanified';

  eventDbRef: AngularFirestoreCollection<EventToPlanification>;

  constructor(private db: AngularFirestore) {
    this.eventDbRef = db.collection(this.dbPath);
    console.log(this.eventDbRef);
    
  }

  getAll(id) {
    return this.db.collection<any>(
      'eventsPlanified', // nom de lacollectoin (ref)
      ref => ref.where('userUID', '==', id).orderBy('dateTime','asc') // query firebase sur la réféernce choisi
    );
  }

  create(event: EventToPlanification): any {
    return this.eventDbRef.add({ ...event });
  }

  async getByID(id: string) {
    return await this.eventDbRef.doc(id).get().toPromise().then(
      (doc) =>{ return doc.data()}
    )
    
  }

  update(id: string, data: any): Promise<void> {
    return this.eventDbRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.eventDbRef.doc(id).delete();
  }
}