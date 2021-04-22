import { Component, OnInit } from '@angular/core';
import { FavoritesStorageService } from 'src/app/@services/favorites-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})


export class FavoritesComponent implements OnInit {

  FavoriteListe: any;

  constructor(private _getFavorite: FavoritesStorageService) { }

  ngOnInit() {
    this.getFavListe();

  }

  async getFavListe() {
    this.FavoriteListe = await this._getFavorite.getListEvent()
    .then(res =>  res.favEventList );
    
    return this.FavoriteListe



  }

}
