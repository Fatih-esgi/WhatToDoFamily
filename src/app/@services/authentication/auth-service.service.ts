import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { InfoToastService } from 'src/app/@cores/toast/info-toast.service';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor(public auth: AngularFireAuth,private route:Router, public _toast:InfoToastService) {}

  ///login google function
  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(()=> this._toast.presentToast('connecté','success'))
  }

  ///login email&password function
  loginMail(email:string,password:string){
    this.auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  
  }

  ///logout function
  logout() {
    this.auth.signOut()
    .then(()=>this.route.navigate(['/home'])
    .then(()=> this._toast.presentToast('Déconnecté','warning'))
    );
  }


}
