import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventsPlanificationService } from 'src/app/@services/storage/events-planification.service';
import { InfoToastService } from 'src/app/@services/toast/info-toast.service';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.scss']
})
export class RegisterEventComponent implements OnInit {
  begDate; ////--->string fonctionne pas?
  endDate: Date;
  eventID:string;
  userUID:string;
  @Input() selectedDateTime: Date;

  constructor(
    private modalController: ModalController,
    private _planificationService: EventsPlanificationService,
    private route: ActivatedRoute,
    private router: Router,
    private toast : InfoToastService
  ) {
    this.begDate = new Date().toISOString();
  }

  ngOnInit(): void {
    console.log(this.begDate, this.endDate);  
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  planificateEvent() {
    const dataToSend = {userUID: this.userUID,eventID:this.eventID,dateTime:this.selectedDateTime}
    this._planificationService.create(dataToSend)
    this.toast.presentToast('événement planifié', 'success')
      this.dismiss()
  }
}
