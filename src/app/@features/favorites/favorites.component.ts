import { Component, OnInit } from '@angular/core';
import { FavoritesStorageService } from 'src/app/@services/favorites-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

   FavoriteListe:any;
  constructor(
    private _getFavorite :FavoritesStorageService
  ) {
    this.getFavListe();  
    this.test();
  }

  async ngOnInit() {}

  async getFavListe() {
    this.FavoriteListe = await this._getFavorite.getListEvent()
    
      return this.FavoriteListe
    
    
   
  }
 
  test(){
    console.log(this.FavoriteListe);
    
  }
}
