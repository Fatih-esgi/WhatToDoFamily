import { Component, OnInit, ViewChild, LOCALE_ID, Inject, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
  calendarView: boolean = true;
  isToday: boolean;

  calendar = {
    mode: 'month',
    step: 30,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      }
    }
  };

  userID;
  selectedDate: Date;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private _myEventDB: EventsPlanificationService,
    private _auth: AngularFireAuth,
    private _router: Router
  ) { }

  async ngOnInit() {
    this.userID = await (await (this._auth.currentUser)).uid
    console.log(this.userID);

    this._myEventDB.getAll(await this.userID).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.doc.data())    ////!!! ({ id: c.payload.doc.id, ...c.payload.doc.data() })   ne fonctionne pas    
        )
      )
    ).subscribe(data => {
      this.eventSource = this.createCalendar([...data]);
    });

  }


  createCalendar(data) {

    var events = [];

    data.forEach(index => {
      
      const transformedDate = new Date(index.dateTime)
      events.push({
        title: index.eventTitle,
        startTime: transformedDate,
        endTime: transformedDate,
        allDay: false,
        id: index.eventID
      });
    });
    return events;
  }


  // Calendar event was clicked
  async onEventSelected(event) {
    console.log(event);
    
    console.log(this._router.navigate(['/tabs/event/',event.id] ));
    
    // this._router.navigate(['tabs/event'], event.id );
  }


  removeEvents() {
    this.eventSource = [];
  }



  // Change current month
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
}