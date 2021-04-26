import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';
import { ModalController } from '@ionic/angular';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-liste-event',
  templateUrl: './liste-event.component.html',
  styleUrls: ['./liste-event.component.scss']
})
export class ListeEventComponent implements OnInit {
  categorySlideOpts = {
    initialSlide: 1,
    speed: 400
  };

  searchInput: String = '';
  max = 10;
  min = 0;
  listeEvent;
  activeCategory: string = "all";
  searchResult: Array<any>;



  constructor(
    private _afs: FirestoreService,
    public modalController: ModalController
  ) {
  }

  async ngOnInit() {
    this.listeEvent = await this._afs.getliste$();
  }

  fetchEvents(event: any) {
    if (event.target.value === '') {
      return this.searchResult = this.listeEvent;
    }

    this.searchResult = this.listeEvent.filter((evenement) => {
      return evenement.name.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
  }


  cancelSearch() {
    return this.searchResult = this.listeEvent;
  }

  catChanged($event: any): void {
    console.log($event.detail.value);
    this.activeCategory = $event.detail.value;
  }

  async onClickFilter() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
  async loadData(event) {
    this.max = this.max + 10;
    event.target.complete();
  }
}
