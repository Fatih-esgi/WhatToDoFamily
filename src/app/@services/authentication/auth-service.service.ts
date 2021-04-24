import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public auth: AngularFireAuth, public toastController: ToastController,private route:Router) {
  }
  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(()=> this.presentToast('connecté','success'))
  }

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

  logout() {
    this.auth.signOut()
    .then(()=>this.route.navigate(['/home'])
    .then(()=> this.presentToast('Déconnecté','success'))
    );
  }

async presentToast(message:string,color:string) {
  const toast = await this.toastController.create({
    message: message,
    animated:true,
    color: color,
    position:"top",
    duration: 2000
  });
  toast.present();
}
}
