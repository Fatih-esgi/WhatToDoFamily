import { Component, OnInit } from '@angular/core';
import { FavoritesStorageService } from 'src/app/@services/storage/favorites-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})


export class FavoritesComponent implements OnInit {

  FavoriteListe: any;

  constructor(private _Favorite: FavoritesStorageService) { }

  async ngOnInit() {
    this.FavoriteListe = await this._Favorite.get()
    console.log(this.FavoriteListe); 
     return this.FavoriteListe

  }

  removeFav(eventId){
    this._Favorite.destroy(eventId)
  }

}
