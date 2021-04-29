import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {
  @Input()  date: Date;
  @Output() dateChange = new EventEmitter<Date>();

  @Input()  reqWeatherSelect: Date;
  @Output() reqWeatherSelectUPD = new EventEmitter<Date>();

  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
  }

/// fermeture du modal
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

changeDate($event){
  console.log('sadfasdf',$event.value);
}

changeReqWeather($event){
  console.log('sadfasdf',$event);
}
  resetFilter(){}
  filterSend(){}
}
