import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { RatingService } from 'src/app/@services/rating/rating.service';
import { InfoToastService } from 'src/app/@services/toast/info-toast.service';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss']
})
export class RateModalComponent implements OnInit {
  @Input() rating$;
  @Input() comment$;
  userUID: string;
  eventID: string;
  ratingStatut;
  ratingGlobal;
  raters;
  userName;


  constructor(
    private modalController: ModalController,
    private toast: InfoToastService,
    private auth: AngularFireAuth,
    private _ratingService: RatingService
  ) { }

  async ngOnInit() {
    console.log('ratglob', this.ratingGlobal);
    console.log('raters', this.raters);
    this.userUID = (await this.auth.currentUser).uid
    console.log(this.userName);
    
  
  };


//dismiss du modal
dismiss() {
  this.modalController.dismiss({
    'dismissed': true
  });
}

//rating add

//rating upd

//raters increase

//add comment

//add rate

//share comment


//share vote
 async share() {
console.log('urname',this.userName);

  // creation liste à envoyer
    const data4RatingDB = {
      rating: this.rating$,
      comment: this.comment$,
      userUID: this.userUID,
      userName: this.userName,
      eventID: this.eventID,

    }
    const data4EventDB = {
      raters:this.raters,
      ratingGlobal:this.ratingGlobal
    }


    await this.saveInDBEvent(data4EventDB)
    await this.saveInDbRating(data4RatingDB)
    
    this.toast.presentToast('Vote effectué, Merci', 'success')
    this.dismiss()

}

//save rating in db evaluations 
saveInDbRating(data){
  this._ratingService.create(data);
  console.log(data);
}

saveInDBEvent(data){
// this._ratingService.
}
}
