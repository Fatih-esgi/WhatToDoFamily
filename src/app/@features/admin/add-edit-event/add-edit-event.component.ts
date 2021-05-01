import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EventsToDb } from 'src/app/@interfaces/events-to-db';
import { EventCRUDService } from 'src/app/@services/admin/event-crud.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  minCalendarDate : string 
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private eventsDb: EventCRUDService,
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      
      this.minCalendarDate = new Date().toISOString();

      this.form = this.formBuilder.group({
        eventTitle:['', Validators.required],
        eventCategory :['', Validators.required],
        eventStartDate:['', Validators.required],
        eventEndDate:['', Validators.required],
        eventAddress:['', Validators.required],
        eventCity:['', Validators.required],
        eventNPA:['', Validators.required],
        eventDescr:['', Validators.required],
        eventLat:['', Validators.required],
        eventLong:['', Validators.required],
        eventStates:['', Validators.required],
        infocost:['', Validators.required],
        infoDog:['', Validators.required],
        infoGen:['', Validators.required],
        infoHandicap:['', Validators.required],
        infoTransp:['', Validators.required],
        media1:['', Validators.required],
        media2:[''],
        media3:[''],
        media4:[''],
        media5:[''],
        media6:[''],
        orgAdress:['', Validators.required],
        orgCity:['', Validators.required],
        orgName:['', Validators.required],
        orgPhone:['', Validators.required],
        orgState:['', Validators.required],
        orgNPA:['', Validators.required],
        reqWeather:['', Validators.required],
      });

      if (!this.isAddMode) {
          // this.eventsDb.getById(this.id)
          //     .pipe(first())
          //     .subscribe(x => this.form.patchValue(x));
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.form.invalid) {
          return;
      }

      this.loading = true;

      if (this.isAddMode) {
          this.createEvent();
      } else {
          this.updateEvent();
      }
  }

  private createEvent() {
      console.log('usercreate')
  }

  private updateEvent() {
    console.log('');
    
  }
}