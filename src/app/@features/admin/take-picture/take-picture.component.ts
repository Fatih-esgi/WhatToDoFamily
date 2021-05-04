import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraResultType } from '@capacitor/core';


@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.scss']
})

export class TakePictureComponent implements OnInit {

imgTempUrl1;
img1WebUrl;

@Input() eventID;
@Output() newImgEvent = new EventEmitter<string>();

  constructor(
    private _storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    console.log(this.eventID);
 
    
  }
  async takePicture() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    const imageUrl = image.webPath;
 
    this.imgTempUrl1 = imageUrl;
    
    console.log(this.imgTempUrl1);

   await this.savePict();
    
  }

  async savePict() {
    const blob = await this._readAsBlob(this.imgTempUrl1);
    const timeStamp = Date.now();
    const eventID = this.eventID;
    const ref = this._storage.ref(timeStamp + '_' + eventID + '.jpeg');
    const task = ref.put(blob);
    await task.then();
    const url = await ref.getDownloadURL().toPromise();
    this.img1WebUrl = url ;
    console.log('imgurl----->',this.img1WebUrl );
    this.newImgEvent.emit(url);
    ;

  }

  private async _readAsBlob(webPath: string) {
    // Fetch the file and read as a blob
    const response = await fetch(webPath);
    const blob = await response.blob();
    return blob;
  }
}
