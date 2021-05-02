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

  max = 10;
  min = 0;
  listeEvent;
  activeCategory: number ;
  term;
  chips;

  constructor(
    private _afs: FirestoreService,
    public modalController: ModalController,
  ) {   this.activeCategory = 0;
  }

  async ngOnInit() {
    this.listeEvent = await this._afs.getliste$();
 
    // console.log('listeeventnew',this.listeEvent);

  }



  async catChanged($event) {        
     this.activeCategory = await Number($event.detail.value);
    await this._afs.updateFilter({category : this.activeCategory});
  }

  async onClickFilter() {
    this.chips = {};
    const modal = await this.modalController.create({
      component: SearchModalComponent,
    });

    await modal.present();
    const newFilter = await modal.onWillDismiss()
      .then(
        res => { return res.data; }
      )

      this.chips = newFilter;
      this._afs.updateFilter(newFilter);
  }

  async loadData(event) {
    this.max = this.max + 10;
    event.target.complete();
  }

}