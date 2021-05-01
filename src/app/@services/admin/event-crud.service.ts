import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { EventsToDb } from 'src/app/@interfaces/events-to-db';


@Injectable({
  providedIn: 'root'
})
export class EventCRUDService {
  private dbPath = '/events';

  eventDbRef: AngularFirestoreCollection<EventsToDb>;

  constructor(private db: AngularFirestore) {
    this.eventDbRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<EventsToDb> {
    return this.eventDbRef;
  }

  create(event: EventsToDb): any {
    return this.eventDbRef.add({ ...event });
  }

  update(id: string, data: any): Promise<void> {
    return this.eventDbRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.eventDbRef.doc(id).delete();
  }
}