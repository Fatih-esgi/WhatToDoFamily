import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesStorageService } from 'src/app/@services/storage/favorites-storage.service'
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';
import { GeoService } from 'src/app/@services/gelocation/geo.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  like: boolean = true;
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
    // private _favData: FavoritesStorageService,
    private route: ActivatedRoute,
    private _afs: FirestoreService,
    public _userPosition$ : GeoService,
    public auth: AngularFireAuth,
  ) { 
  }

  async ngOnInit() {
    //active route --> get id
    this.sub = await this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.eventData = await this._afs.getByID(this.id)
    console.log('testdata', this.eventData);

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
   
  }

  ngOnDestroy() {
    //unsubscribe activated route
    this.sub.unsubscribe();
  }
  share() {
    console.log('clicked share');
  }

  // async toggleFavorites() {
  //   console.log('clicked favorites');
  //   if (this.like == true) {
  //     this.like = false;
  //     this.favEventList = await this._favData.setFavorite(this.id);
  //   } else {
  //     this.like = true;
  //     this.favEventList = await this._favData.removeFavorite(this.id);
  //   }
  // }

  planificateEvent() {
    console.log(this.id);
    console.log(this.user)
    // this._afs.sendToUserEvent(this.id);
  }
}
