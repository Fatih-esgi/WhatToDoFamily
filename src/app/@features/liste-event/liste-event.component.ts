import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/@services/firestore.service';
import { InjectJsonToFirestoreService } from 'src/app/@services/inject-json-to-firestore.service';

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

  public searchInput: String = '';
  max = 10;
  min = 0;
  listeEvent;
  activeCategory:string = "all";
  public searchResult: Array<any>;
  constructor(
    private _afs : FirestoreService,
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

  catChanged($event:any):void{
    console.log($event.detail.value);
    this.activeCategory = $event.detail.value;
  }

  onClickFilter() {
    alert('filter click')
   }

   async loadData(event) {
    this.max = this.max + 10;
    event.target.complete();
  }
}
