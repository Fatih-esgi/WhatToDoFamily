import {  Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventCRUDService } from 'src/app/@services/admin/event-crud.service';
import { InfoToastService } from 'src/app/@services/toast/info-toast.service';

import { Camera, CameraResultType } from '@capacitor/core';

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

  imgTempUrl1;
  img1WebUrl;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private _eventsDb: EventCRUDService,
    private _toast: InfoToastService, private _storage: AngularFireStorage
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
      ratingGlobal: 0,
      raters: 0,
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
    console.log('-img------>', this.img1WebUrl);

    this.submitted = true;

    if (this.form.invalid) {
      console.log('error');
      this._toast.presentToast('erreur dans le formulaire', 'danger');
      return;
    }

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

  /////-----------------pictures functions-------------------------//////

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    const imageUrl = image.webPath;
    this.imgTempUrl1 = imageUrl;
   await this.savePict();
    
  }

  async savePict() {
    const blob = await this._readAsBlob(this.imgTempUrl1);
    const timeStamp = Date.now();
    const eventID = this.id;
    const ref = this._storage.ref(timeStamp + '_' + eventID + '.jpeg');
    const task = ref.put(blob);
    await task.then();
    const url = await ref.getDownloadURL().toPromise();
    this.img1WebUrl = await url;
    this.form.get('media1').setValue(url);
  }

  private async _readAsBlob(webPath: string) {
    // Fetch the file and read as a blob
    const response = await fetch(webPath);
    const blob = await response.blob();
    return blob;
  }
}