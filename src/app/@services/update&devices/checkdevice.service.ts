import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IosInstallToastService } from 'src/app/@services/toast/ios-install-toast.service';

@Injectable({
  providedIn: 'root'
})
export class CheckdeviceService {

  constructor(
    private _toast: IosInstallToastService,
  ) { 
  }
  checkDevice() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    };
    // Detect if app is install
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);
    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this._toast.displayPopUpInstall();
    }
  }

  

}
