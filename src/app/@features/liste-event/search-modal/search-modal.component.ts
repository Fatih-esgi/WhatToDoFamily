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

  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
  }

  /// fermeture du modal
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  resetFilter() {
    this.date = undefined
    this.ville = undefined
    this.reqWeather= undefined
    this.range = undefined
    this.cost = undefined
    this.infoHandicap = undefined
    this.infoDog = undefined
  }

  filterSend() {
    this.modalController.dismiss({
      date: this.date,
      ville: this.ville,
      reqWeather: this.reqWeather,
      range: this.range,
      cost: this.cost,
      infoHandicap: this.infoHandicap,
      infoDog: this.infoDog
    });

  }
}
