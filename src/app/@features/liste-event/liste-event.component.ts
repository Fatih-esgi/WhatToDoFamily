import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';
import { ModalController } from '@ionic/angular';
import { SearchModalComponent } from './search-modal/search-modal.component';

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
  term;


  constructor(
    private _afs: FirestoreService,
    public modalController: ModalController,
  ) {
  }

  async ngOnInit() {
    this.listeEvent = await this._afs.getliste$();
    // console.log('listeeventnew',this.listeEvent);

  }

  cancelSearch() {
  }

  async catChanged($event: any) {
    const activeCategory = $event.detail.value;
    if (activeCategory == 0) {
      this.listeEvent = await this._afs.getliste$();
    } else {
      this.listeEvent = await this._afs.getCategory$($event.detail.value);

    }
    return this.listeEvent;
  }

  async onClickFilter() {

    const modal = await this.modalController.create({
      component: SearchModalComponent,
    });
    await modal.present();
    const newFilter = await modal.onWillDismiss().then(
      res => {
        return res.data
      }
    )
    console.log(newFilter);
    
  }

  async loadData(event) {
    this.max = this.max + 10;
    event.target.complete();
  }
}
