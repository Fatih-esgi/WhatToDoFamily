import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild,LOCALE_ID, Inject, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { map } from 'rxjs/operators';
import { EventsPlanificationService } from 'src/app/@services/storage/events-planification.service';

@Component({
  selector: 'app-calendrar-view',
  templateUrl: './calendrar-view.component.html',
  styleUrls: ['./calendrar-view.component.scss']
})
export class CalendrarViewComponent implements OnInit {
  eventSource = [];
  viewTitle: string;
  calendarView:boolean = true;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  selectedDate: Date;
 @Input() userID;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    private _myEventDB: EventsPlanificationService
  ) {}
 
  async ngOnInit() {
    
    this._myEventDB.getAll(this.userID).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.doc.data())    ////!!! ({ id: c.payload.doc.id, ...c.payload.doc.data() })   ne fonctionne pas    
          )
          )
          )
          .subscribe(data => {
            this.eventSource = data
            console.log(this.eventSource);
          });
        }
        createEvent() {
    var events = [];
    this.eventSource.forEach(element => {
      events.push({
        title: element.eventTitle,
        startTime: element.dateTime,
        eventID: element.eventID,
        imgEvent: element.image1
      })
      console.log('---> events', events);

    });
  }
 

  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK','supprimer'],
    });
    alert.present();
  }
 
  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        let startMinute = Math.floor(Math.random() * 24 * 60);
        let endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    this.eventSource = events;
  }
 
  removeEvents() {
    this.eventSource = [];
  }
}