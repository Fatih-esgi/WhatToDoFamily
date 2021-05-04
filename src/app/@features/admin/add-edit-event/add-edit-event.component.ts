import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventCRUDService } from 'src/app/@services/admin/event-crud.service';
import { InfoToastService } from 'src/app/@services/toast/info-toast.service';

import { Plugins, CameraResultType } from '@capacitor/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { TakePictureComponent } from '../take-picture/take-picture.component';
const { Camera } = Plugins;


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
  minCalendarDate: string
  SelectedEvent;

  img1WebUrl$

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _eventsDb: EventCRUDService,
    private _toast: InfoToastService,


  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;


    this.minCalendarDate = new Date().toISOString();

    this.form = this.formBuilder.group({
      eventTitle: ['', Validators.required],
      category: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventAddress: ['', Validators.required],
      eventCity: ['', Validators.required],
      eventNPA: ['', Validators.required],
      eventDescr: ['', Validators.required],
      eventLat: ['', Validators.required],
      eventLong: ['', Validators.required],
      eventStates: ['', Validators.required],
      infoCost: ['', Validators.required],
      infoDog: ['', Validators.required],
      infoGen: ['', Validators.required],
      infoHandicap: ['', Validators.required],
      infoTransp: ['', Validators.required],
      media1: ['', Validators.required],
      orgAdress: ['', Validators.required],
      orgCity: ['', Validators.required],
      orgName: ['', Validators.required],
      orgPhone: ['', Validators.required],
      orgState: ['', Validators.required],
      orgNPA: ['', Validators.required],
      reqWeather: ['', Validators.required],
    });

    /// if not add mode, get event from db & patch to form
    if (!this.isAddMode) {
      this.SelectedEvent = await this._eventsDb.getByID(this.id)
      this.form.patchValue(this.SelectedEvent)
      console.log(this.SelectedEvent);

    }
  }

  get errorControl() {
    return this.form.controls;
  }

  
  get f() { return this.form.controls; }// raccourci controle formulaire 

  
  onSubmit() {
    console.log('-formulaire------>', this.form.value);
    console.log('-img------>', this.img1WebUrl$);

    this.submitted = true;

    if (this.form.invalid) {
      console.log('error');
      this._toast.presentToast('erreur dans le formulaire', 'danger');
      return;
    }

    this.loading = true;

    if (this.isAddMode) {
      this.createEvent();
      this._toast.presentToast('événement créé', 'success');
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.updateEvent();
      this._toast.presentToast('événement modifié', 'success');
      this.router.navigate(['../../'], { relativeTo: this.route });

    }
  }

  addPictUrl($event){
    console.log('event---->',$event);
    console.log('formbefore---->',this.form.value.media1);
    this.form.value.media1 = $event
    console.log('formafter---->',this.form.value.media1);
  }


  private createEvent() {
    this._eventsDb.create(this.form.value)
  }

  private updateEvent() {
    this._eventsDb.update(this.id,this.form.value)
  }

}