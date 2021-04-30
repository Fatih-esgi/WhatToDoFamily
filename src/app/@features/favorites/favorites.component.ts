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
      await this._Favorite.get().subscribe(results => {
      // Do whatever you need to do with the results
      console.log("sdfasdf",results);
      this.FavoriteListe = results
      return this.FavoriteListe;
  })
     

  }

  async removeFav(eventId){
    await this._Favorite.destroy(eventId)
  }

}
