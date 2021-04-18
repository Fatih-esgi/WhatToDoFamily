import { Component, OnInit } from '@angular/core';
import { FavoritesStorageService} from 'src/app/@services/favorites-storage.service'
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  like:boolean = true;
  favEventList:any;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  
  constructor(
    private _favData: FavoritesStorageService
  ) { 
  }

  ngOnInit(): void {
  }

  share(){
    console.log('clicked share');
  }

  async addToFavorites(){
    console.log('clicked favorites');
    if (this.like == true) {
      this.like = false;
    } else {
      this.like = true;
      this.favEventList = await this._favData.setFavorite('2');
    }
  }
}
