import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventsPlanificationService } from 'src/app/@services/storage/events-planification.service';
import { InfoToastService } from 'src/app/@services/toast/info-toast.service';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.scss']
})

// ------------------------------------------------------------------------------------------------------

export class RegisterEventComponent{
  begDate; ////--->string fonctionne pas?
  endDate: Date;
  eventID:string;
  userUID:string;
  @Input() selectedDateTime$: Date;

  constructor(
    private modalController: ModalController,
    private _planificationService: EventsPlanificationService,
    private toast : InfoToastService
  ) {
     // assignation date du jour pour limiter sélécteur date min
    this.begDate = new Date().toISOString();
  }

  //dismiss du modal
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //planification de l'événement
  planificateEvent() {
    const dataToSend = {userUID: this.userUID,eventID:this.eventID,dateTime:this.selectedDateTime$} // creation liste à envoyer
    this._planificationService.create(dataToSend) // envoi de la liste
    this.toast.presentToast('événement planifié', 'success') // présentation du toast
      this.dismiss()
  }
}
