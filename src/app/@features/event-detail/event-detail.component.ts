import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesStorageService } from 'src/app/@services/favorites-storage.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  like: boolean = true;
  favEventList: any;
  id: any;
  private sub: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private _favData: FavoritesStorageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    //active route --> get id
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  ngOnDestroy() {
    //unsubscribe activated route
    this.sub.unsubscribe();
  }
  share() {
    console.log('clicked share');
  }

  async toggleFavorites() {
    console.log('clicked favorites');
    if (this.like == true) {
      this.like = false;
      this.favEventList = await this._favData.setFavorite(this.id);
    } else {
      this.like = true;
      this.favEventList = await this._favData.removeFavorite(this.id);
    }
  }
}
