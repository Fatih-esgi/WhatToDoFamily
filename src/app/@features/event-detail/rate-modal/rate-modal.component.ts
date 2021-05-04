import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoToastService } from 'src/app/@services/toast/info-toast.service';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss']
})
export class RateModalComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private toast: InfoToastService
  ) { }

  ngOnInit(): void {
  }
  //dismiss du modal
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //share vote
  shareRating(){
    this.toast.presentToast('Vote effectué, Merci','success')
  }
}
