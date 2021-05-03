import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventCRUDService } from 'src/app/@services/admin/event-crud.service';
import { InfoToastService } from 'src/app/@services/toast/info-toast.service';

import { Plugins, CameraResultType } from '@capacitor/core';
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
  imageUrl1;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _eventsDb: EventCRUDService,
    private _toast: InfoToastService

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
      media1:['', Validators.required],
      // media2:[''],
      // media3:[''],
      // media4:[''],
      // media5:[''],
      // media6:[''],
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
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    console.log('------->', this.form);

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

  private createEvent() {
    this._eventsDb.create(this.form.value)
  }

  private updateEvent() {
    this._eventsDb.update(this.id,this.form.value)
  }


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.imageUrl1 = imageUrl;
    console.log(this.imageUrl1);
    
  }


}