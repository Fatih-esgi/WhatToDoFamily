import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public auth: AngularFireAuth) {
  }
  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginMail(){
    this.auth.signInWithEmailAndPassword
  }
  logout() {
    this.auth.signOut();
  }
}