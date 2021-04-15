import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  constructor(
    private _toast: ToastController,
    private _updates : SwUpdate
  ) { }

  checkUpdates(){
    this._updates.available.subscribe(event => { 
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      if (event.current != event.available) {
        this.displayPopUpUpdate();
      }
    });
   }
     
   async displayPopUpUpdate() {
    const toast = await this._toast.create({
      message: `Nouvelle version disponible mettre à jour`,
      position: 'bottom',
      keyboardClose: true,
      color: 'dark',
      buttons: [
        {
          text: 'mettre à jour',
          role: 'cancel',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });
    await toast.present();
  }
}
