import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController) { }

  ngOnInit(): void {
  }
  dismiss() {  
    this.modalCtrl.dismiss();  
  }  
}
