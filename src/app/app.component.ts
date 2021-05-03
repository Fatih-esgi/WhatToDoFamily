import { Component } from '@angular/core';
import { CheckdeviceService } from './@services/update&devices/checkdevice.service';
import { UpdatesService } from './@services/update&devices/updates.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WhatToDoFamily';

constructor(
  private _checkDevice : CheckdeviceService,
  private _checkUpdates : UpdatesService,

){
 this._checkDevice.checkDevice();
 this._checkUpdates.checkUpdates();

 
}


}
