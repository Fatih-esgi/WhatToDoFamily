import { Component, OnInit, } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  calendarView: boolean = true;
  userID;

  constructor(
    private _auth: AngularFireAuth
  ) {}
  
  async ngOnInit(){
     this.userID = await (await (this._auth.currentUser)).uid
     
   }
  segmentChanged(event) {
    //toggle vue calendrier/liste
    if (event.detail.value == "calendrier") {
      this.calendarView = true;
    } else {
      this.calendarView = false;
    }
  }

}