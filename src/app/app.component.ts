import { Component } from '@angular/core';
import { CheckdeviceService } from './@services/update&devices/checkdevice.service';
import { UpdatesService } from './@services/update&devices/updates.service';
import { Plugins } from '@capacitor/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'WhatToDoFamily';
  public showOverlay = true;

  constructor(
    private _checkDevice: CheckdeviceService,
    private _checkUpdates: UpdatesService,
    private router: Router

  ) {
    this._checkDevice.checkDevice();
    this._checkUpdates.checkUpdates();
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })

  }
  
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }

}
