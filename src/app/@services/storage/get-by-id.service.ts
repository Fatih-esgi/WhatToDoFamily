import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetByIdService {
  title = 'Fire';
  // utilisé pour stocker une référence dans la base de donnée
  private _itemsCollection: AngularFirestoreCollection<any>;
  // utiliser pour le stockage des données en provenance de la base de donnée
  items$: Observable<any[]>;

  constructor(
    private _afs: AngularFirestore // import du service Firebase
  ) {
this._itemsCollection = this._afs.collection<any>('events');
  }

  async getByID(id: string) {
    return await this._itemsCollection.doc(id).get().toPromise().then(
      (doc) =>{ return doc.data()}
    )
  }
}