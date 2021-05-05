import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  userID:string;

  private dbPath = '/evaluations';

  eventDbRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.eventDbRef = db.collection(this.dbPath);    
  }

  // getAll(id) {
  //   return this.db.collection<any>(
  //     'evaluations', // nom de lacollectoin (ref)
  //     ref => ref.where('userUID', '==', id).orderBy('dateTime','asc') // query firebase sur la réféernce choisi
  //   );
  // }

  create(event): any {
    return this.eventDbRef.add({ ...event });
  }


  getAllComms(id){
    return this.db.collection<any>(
      'evaluations', // nom de lacollectoin (ref)
      ref => ref.where('eventID', '==', id) // query firebase sur la réféernce choisi
    );
  }
  // async getByID(id: string) {
  //   return await this.eventDbRef.doc(id).get().toPromise().then(
  //     (doc) =>{ return doc.data()}
  //   )
    
  //  }

  // update(id: string, data: any): Promise<void> {
  //   return this.eventDbRef.doc(id).update(data);
  // }

  // delete(id: string): Promise<void> {
  //   return this.eventDbRef.doc(id).delete();
  // }
}