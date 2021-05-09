import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { EventsToDb } from 'src/app/@interfaces/events-to-db';
import { EventCRUDService } from 'src/app/@services/admin/event-crud.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent implements OnInit {
  events?: EventsToDb[];
  currentIndex = -1;
  title = 'Administration';

  constructor(private eventCRUD: EventCRUDService) { }

  ngOnInit(): void {
    this.retrieveEvents();
  }

  refreshList(): void {
    this.retrieveEvents();
  }

  retrieveEvents(): void {
    this.eventCRUD.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.events = data;
    });
  }

  eraseEvent(id, title) {
    if (confirm("Voulez vous vraiment Effacer" + title)) {
      this.eventCRUD.delete(id)
    }
  }
}