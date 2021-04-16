import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { CheckdeviceService } from './@services/checkdevice.service';
import { UpdatesService } from './@services/updates.service';

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
