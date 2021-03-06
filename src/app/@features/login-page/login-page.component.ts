import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor
    (
      public auth: AngularFireAuth,
      private route: Router
    ) { }

  ngOnInit(): void {
    console.log(this.auth);

  }
}
