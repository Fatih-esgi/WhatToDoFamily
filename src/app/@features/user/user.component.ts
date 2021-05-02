import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthServiceService } from 'src/app/@services/authentication/auth-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  uid;

  constructor(
    public auth: AngularFireAuth,
    private log: AuthServiceService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.uid = user.uid;
    });
  }

  login() {
    this.log.loginGoogle();
  }

  logout() {
    this.log.logout();
  }

}