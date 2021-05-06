import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/@services/storage/firestore.service';
import { ModalController } from '@ionic/angular';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { first } from 'rxjs/operators';

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
  activeCategory: number;
  term;
  chips;

  constructor(
    private _afs: FirestoreService,
    public modalController: ModalController,
  ) {
    this.activeCategory = 0;
  }

  async ngOnInit() {
    this.listeEvent = await this._afs.getliste$();
    // console.log('listeeventnew',this.listeEvent);

  }



  async catChanged($event) {
    this.activeCategory = await Number($event.detail.value);
    const currentFilters = await this._afs.filtersItems$.pipe(
      first()
    ).toPromise()
    currentFilters.category = this.activeCategory;
    console.log('active--->',this.activeCategory);
    
    await this._afs.updateFilter( currentFilters );
  }


  //this activecat -> 
  async onClickFilter() {
    this.chips = {};
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {activeCat:this.activeCategory}
    });

    await modal.present();

    const newFilter = await modal.onWillDismiss()
      .then(
        res => { return res.data; }
      )

    this.chips = newFilter;
    console.log('----_>', newFilter);

    this._afs.updateFilter(newFilter);

  }

  async loadData(event) {
    this.max = this.max + 10;
    event.target.complete();
  }

}