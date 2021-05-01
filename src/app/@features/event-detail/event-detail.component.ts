import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesStorageService } from 'src/app/@services/storage/favorites-storage.service'
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';
import { GeoService } from 'src/app/@services/gelocation/geo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { RegisterEventComponent } from './register-event/register-event.component';

const { Share } = Plugins;


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  likeIcon:string = "heart-outline"
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
  media2: string | null; media3: string | null; media4: string | null; media5: string | null;
  media6: string | null; orgAdress: string; orgCity: string; orgName: string;
  orgPhone: string; orgState: string; reqWeather: string;

  distBetween:any;
  user;


  constructor(
    private route: ActivatedRoute,
    private _afs: FirestoreService,
    public _userPosition$ : GeoService,
    public auth: AngularFireAuth,
    public _favStorage : FavoritesStorageService,
    private modalController: ModalController
  ) { 
  }

  async ngOnInit() {
    //active route --> get id
    this.sub = await this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.eventData = await this._afs.getByID(this.id)
    this.eventTitle = this.eventData.eventTitle;
    this.eventCategory = this.eventData.category;
    this.eventStartDate = this.eventData.dateBegin;
    this.eventEndDate = this.eventData.dateEnd;
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
    this.media2 = this.eventData.media2;
    this.media3 = this.eventData.media3;
    this.media4 = this.eventData.media4;
    this.media5 = this.eventData.media5;
    this.media6 = this.eventData.media6;
    this.orgAdress = this.eventData.orgAddress;
    this.orgCity = this.eventData.orgCity;
    this.orgName = this.eventData.orgName;
    this.orgPhone = this.eventData.orgPhone;
    this.orgState = this.eventData.orgState;
    this.reqWeather = this.eventData.reqWeather;
    this.distBetween = this._userPosition$.getdistance(this.eventLat,this.eventLong,"k")
    this.user = this.auth
   
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


  async toggleFavorites() {   
    
    if (this._favStorage.findItem(this.id)) {

      console.log(this._favStorage.findItem(this.id));
      this.likeIcon = "heart-outline"
      this.favEventList = await this._favStorage.destroy(this.id)
      
    } else {
      console.log(this._favStorage.findItem(this.id));
      this.favEventList = await this._favStorage.post(this.id,this.eventData);
      this.likeIcon = "heart-dislike-outline"

    }
  }



  planificateEvent() {
    console.log(this.id);
    console.log(this.user)
    // this._afs.sendToUserEvent(this.id); 
  }


  async registerEvent() {
    const modal = await this.modalController.create({
      component: RegisterEventComponent,
    });
    return await modal.present();
  }


async sharePopup(){
  await Share.share({
  title: this.eventTitle,
  text: 'Je tenais à partager cet évenement disponible sur WhatToDo Family',
  url: location.href,
  dialogTitle: 'Partager sur :'
});
}

}