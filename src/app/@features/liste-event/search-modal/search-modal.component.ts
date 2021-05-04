import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {
  @Input() date: Date;
  @Input() ville: string;
  @Input() reqWeather: string;
  @Input() range: number;
  @Input() cost: number;
  @Input() infoHandicap: boolean;
  @Input() infoDog: boolean;
  activeCat;
  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
    console.log(this.activeCat);
    
  }

  /// fermeture du modal
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  resetFilter() {
    this.modalController.dismiss({
      date: undefined,
      ville: undefined,
      reqWeather: undefined,
      range: undefined,
      cost: undefined,
      infoHandicap: undefined,
      infoDog: undefined,
      category:this.activeCat
    });
  }

  filterSend() {
    this.modalController.dismiss({
      date: this.date,
      ville: this.ville,
      reqWeather: this.reqWeather,
      range: this.range,
      cost: this.cost,
      infoHandicap: this.infoHandicap,
      infoDog: this.infoDog,
      category:this.activeCat
    });

  }
}
