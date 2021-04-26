import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InfoToastService {

  constructor(public _toastController: ToastController) { }

  ///toast informatif sans validation => requiert message et color
  async presentToast(message: string, color: string) {
    const toast = await this._toastController.create({
      message: message,
      animated: true,
      color: color,
      position: "top",
      duration: 2000
    });
    toast.present();
  }
}