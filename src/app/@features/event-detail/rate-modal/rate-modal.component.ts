import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { EventCRUDService } from 'src/app/@services/admin/event-crud.service';
import { RatingService } from 'src/app/@services/rating/rating.service';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';
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
  commentID: string;
  eventData: any;
  ratingGlobal;
  raters;
  userName;
  userComment;
  addMode: boolean = true;

  constructor(
    private modalController: ModalController,
    private toast: InfoToastService,
    private auth: AngularFireAuth,
    private _ratingService: RatingService,
    private _eventService: EventCRUDService
  ) { }

  async ngOnInit() {
    console.log('ratglob', this.ratingGlobal);
    console.log('raters', this.raters);
    this.userUID = (await this.auth.currentUser).uid

    this.userName = (await this.auth.currentUser).displayName

    this.userComment = await this._ratingService.getUser(this.userUID, this.eventID)




    if (this.userComment) {
      this.addMode = false;
      this.rating$ = this.userComment.rating
      this.comment$ = this.userComment.comment
    } else {
      this.addMode = true;
    }
  };



  //share rating in database 
  async share() {

    const data4RatingDB = { 
      rating: this.rating$,
      comment: this.comment$,
      userUID: this.userUID,
      userName: this.userName,
      eventID: this.eventID,
    }

    //if user dont have rating: addmode true
    if (this.addMode === true) {
      
      const data4EventDB = {   
        raters: this.raters + 1,
        ratingGlobal: this.ratingGlobal + this.rating$
      }

      this.saveInDBEvent(this.eventID, data4EventDB); //send to function save in database Event 
      this.saveInDbRating(data4RatingDB);  //send to function save in database Evaluation  
      this.toast.presentToast('Vote effectué, Merci', 'success');  //toast present
      this.dismiss(); //dissmiss from modal

    } else {
      //if user  have rating: addmode false

      const data4EventDB = {
        raters: this.raters,
        ratingGlobal: this.ratingGlobal - this.userComment.rating + this.rating$
      }
      console.log('data4EventDB',data4EventDB);
      this.saveInDBEvent(this.eventID, data4EventDB); //send to function save in database Event  //send to function save in database Event 
      this.updateInDbRating(this.userComment.id, data4RatingDB);  //send to function save in database Evaluation --> comment.id & data 
      this.toast.presentToast('Vote modifié, Merci', 'success');  //toast present
      this.dismiss();//dissmiss from modal
    }
  }

  //function save rating in db evaluations 
  saveInDbRating(data) {
    this._ratingService.create(data);
  }

  //function update rating in db evaluations 
  updateInDbRating(id, data) {
    this._ratingService.update(id, data);
  }

  //function save rating in db evaluations 
  saveInDBEvent(id, data) {
    this._eventService.update(id, data)
  }

  //dismiss from modal
  dismiss() {
    this.modalController.dismiss({ 'dismissed': true });
  }

}
