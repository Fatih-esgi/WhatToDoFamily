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
  id: any; eventData: any; eventTitle: string; eventCategory: number;
  eventStartDate: Date; eventEndDate: Date; eventAddress: string; eventCity: string;
  eventDescr: string; eventLat: number; eventLong: number; eventStates: string;
  infocost: number; infoDog: boolean; infoGen: string; infoHandicap: boolean; infoTransp: string; media1: string;
  orgAdress: string; orgCity: string; orgName: string;
  orgPhone: string; orgState: string; reqWeather: string; ratingGlobal: number; raters: number;

  distBetween: any;
  userUID;
  userName;
  comments;

  constructor(
    private route: ActivatedRoute,
    private _afs: FirestoreService,
    public _userPosition$: GeoService,
    public auth: AngularFireAuth,
    public _favStorage: FavoritesStorageService,
    private modalController: ModalController,
    public _toast: InfoToastService,
    private _ratingStorage: RatingService
  ) {
  }

  async ngOnInit() {
    this.userUID = (await this.auth.currentUser)?.uid
    this.userName = (await this.auth.currentUser)?.displayName
    console.log((await this.auth.currentUser)?.displayName);
    
    //active route --> get id
    this.sub = await this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    //get comments by id from db
    this.comments = await this._ratingStorage.getAllComms(this.id).valueChanges();
    console.log('comms', this.comments);

    //get data by id from db
    this.eventData = await this._afs.getByID(this.id)


    //assignation des datas
    this.eventTitle = this.eventData.eventTitle;
    this.eventCategory = this.eventData.category;
    this.eventStartDate = this.eventData.eventStartDate;
    this.eventEndDate = this.eventData.eventEndDate;
    this.eventAddress = this.eventData.eventAddress;
    this.eventCity = this.eventData.eventCity;
    this.eventDescr = this.eventData.eventDescr;
    this.eventLat = await this.eventData.eventLat;
    this.eventLong = await this.eventData.eventLong;
    this.eventStates = this.eventData.eventStates;
    this.infocost = this.eventData.infoCost;
    this.infoDog = this.eventData.infoDog;
    this.infoGen = this.eventData.infoGen;
    this.infoHandicap = this.eventData.infoHandicap;
    this.infoTransp = this.eventData.infoTransp;
    this.media1 = this.eventData.media1;
    this.orgAdress = this.eventData.orgAddress;
    this.orgCity = this.eventData.orgCity;
    this.orgName = this.eventData.orgName;
    this.orgPhone = this.eventData.orgPhone;
    this.orgState = this.eventData.orgState;
    this.reqWeather = this.eventData.reqWeather;
    this.ratingGlobal = this.eventData.ratingGlobal;
    this.raters = this.eventData.raters;
    //calcul de la distance entre user et position de l'event
    this.distBetween = this._userPosition$.getdistance(this.eventLat, this.eventLong, "k")

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
      this.favEventList = await this._favStorage.post(this.id, this.eventData);
      this._toast.presentToast('Ajouté à vos Favoris', 'success');
    }
  }




  async registerEvent() {
    const modal = await this.modalController.create({
      component: RegisterEventComponent,
      componentProps: {
        endDate: this.eventEndDate,
        eventID: this.id,
        userUID: this.userUID,
        userName: this.userName,
        eventTitle: this.eventTitle,
        image1: this.media1
      }
    });
    return await modal.present();
  }


  async rateEvent() {
    const modal = await this.modalController.create({
      component: RateModalComponent,
      componentProps: {
        eventID: this.id,
        ratingGlobal: this.ratingGlobal,
        raters: this.raters
      }
    });
    return await modal.present();
  }


  async sharePopup() {
    await Share.share({
      title: this.eventTitle,
      text: 'Je tenais à partager cet évenement disponible sur WhatToDo Family',
      url: location.href,
      dialogTitle: 'Partager sur :'
    });
  }

}