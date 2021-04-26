import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UpdateToastService } from 'src/app/@shared/toast/update-toast.service';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  constructor(
    private _updates : SwUpdate,
    private _popup : UpdateToastService
  ) { }

  checkUpdates(){
    this._updates.available.subscribe(event => { 
      if (event) {
        this._popup.displayPopUpUpdate();
      }
    });
   }
     
  
}
