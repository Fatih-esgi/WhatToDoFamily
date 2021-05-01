import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.scss']
})
export class RegisterEventComponent implements OnInit {
  begDate;
  endDate;
  eventID;
  constructor(private modalController: ModalController) { 
    // this.begDate = new Date(this.begDate).toISOString()
    // this.endDate = this.endDate
  }


  ngOnInit(): void {
    console.log(this.begDate,this.endDate);
    

  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  planificateEvent() {
    this.dismiss()
  }
}
