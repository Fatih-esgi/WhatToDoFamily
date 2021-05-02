import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateToastService {

  constructor(private _toastController: ToastController) { }

async displayPopUpUpdate() {
  const toast = await this._toastController.create({
    message: `Une Nouvelle version de lâpplication est disponible`,
    position: 'bottom',
    keyboardClose: true,
    color: 'warning',
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