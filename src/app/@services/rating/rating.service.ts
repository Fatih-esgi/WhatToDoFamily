import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  userID: string;

  private dbPath = '/evaluations';

  eventDbRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.eventDbRef = db.collection(this.dbPath);
  }

  async getUser(userID, eventID) {

    const userRating = await this.db.collection<any>('evaluations', ref =>
      ref.where('userUID', '==', userID)
        .where('eventID', '==', eventID))
      .valueChanges({ idField: 'id' })
      .pipe(first())
      .toPromise()

    if (userRating.length === 1) {
      return userRating[0];
    }
    else {
      return null;
    }
  }

  create(rating): any {
    return this.eventDbRef.add({ ...rating });
  }

  getAllComms(id) {
    return this.db.collection<any>(
      'evaluations', // nom de lacollectoin (ref)
      ref => ref.where('eventID', '==', id) // query firebase sur la réféernce choisi
    );
  }

  update(id: string, data: any): Promise<void> {
    return this.eventDbRef.doc(id).update(data);
  }

  // delete(id: string): Promise<void> {
  //   return this.eventDbRef.doc(id).delete();
  // }
}