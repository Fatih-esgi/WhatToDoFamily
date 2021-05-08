import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesStorageService } from 'src/app/@services/storage/favorites-storage.service'
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';
import { GeoService } from 'src/app/@services/gelocation/geo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { RegisterEventComponent } from './register-event/register-event.component';
import { InfoToastService } from 'src/app/@services/toast/info-toast.service';
import { RateModalComponent } from './rate-modal/rate-modal.component';
import { RatingService } from 'src/app/@services/rating/rating.service';
import { map } from 'rxjs/operators';
import { GetByIdService } from 'src/app/@services/storage/get-by-id.service';
const { Share } = Plugins;


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  likeIcon: string = "heart-outline"
  favEventList: any;

  sub: any;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ///eventDatas
  id: any; 
  eventData: any; 
  distBetween: any;
  userUID;
  userName;
  comments;
  eventData4fav;

  constructor(
    private route: ActivatedRoute,
    private _afs: FirestoreService,
    public _userPosition$: GeoService,
    public auth: AngularFireAuth,
    public _favStorage: FavoritesStorageService,
    private modalController: ModalController,
    public _toast: InfoToastService,
    private _ratingStorage: RatingService,
    private _getByID: GetByIdService
  ) {
  }

  async ngOnInit() {
    this.userUID = (await this.auth.currentUser)?.uid

    // this.userName = (await this.auth.currentUser)?.displayName
    
    //active route --> get id
    this.sub =  this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    //get comments by id from db
    this.comments =  this._ratingStorage.getAllComms(this.id).valueChanges()
    

    //get data by id from db
    console.log(this.id);
    
    this.eventData = await this._getByID.getByID(this.id)
    console.log('eventdata',this.eventData);
   this.eventData4fav=  {id: this.id, ...this.eventData} 
   console.log('eventdataddd',this.eventData4fav);

    console.log(this.comments);
    

    
    //calcul de la distance entre user et position de l'event
    this.distBetween = this._userPosition$.getdistance(this.eventData.eventLat, this.eventData.eventLong, "k")

    //affichage du boutton favoris à l'initialisation
    if (await this._favStorage.findItem(this.id)) {
      this.likeIcon = "heart-dislike-outline"
    } else {
      this.likeIcon = "heart-outline"
    }
  }


  ngOnDestroy() {
    //unsubscribe activated route
    this.sub.unsubscribe();
  }

  //fonction AJOUTER FAVORIS
  async toggleFavorites() {

    if (this._favStorage.findItem(this.id)) {

      this.likeIcon = "heart-outline"//change icone
      this.favEventList = await this._favStorage.destroy(this.id);//destroy event dans le storage
      this._toast.presentToast('Favoris retiré', 'warning');//afficher msg

    } else {
      this.likeIcon = "heart-dislike-outline";
      this.favEventList = await this._favStorage.post( this.id, this.eventData4fav);
      this._toast.presentToast('Ajouté à vos Favoris', 'success');
    }
  }




  async registerEvent() {
    const modal = await this.modalController.create({
      component: RegisterEventComponent,
      componentProps: {
        endDate: this.eventData.eventEndDate,
        eventID: this.id,
        userUID: this.userUID,
        eventTitle: this.eventData.eventTitle,
        image1: this.eventData.media1
      }
    });
    return await modal.present();
  }


  async rateEvent() {
    const modal = await this.modalController.create({
      component: RateModalComponent,
      componentProps: {
        eventID: this.id,
        ratingGlobal: this.eventData.ratingGlobal,
        raters: this.eventData.raters,
      }
    });
    return await modal.present();
  }


  async sharePopup() {
    await Share.share({
      title: this.eventData.eventTitle,
      text: 'Je tenais à partager cet évenement disponible sur WhatToDo Family',
      url: location.href,
      dialogTitle: 'Partager sur :'
    });
  }

}