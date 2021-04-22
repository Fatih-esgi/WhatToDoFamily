import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/@services/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public auth: AuthServiceService, public authcheck : AngularFireAuth) {

  }

  ngOnInit(): void {
    console.log(this.authcheck);
    
  }

  logingoogle() {
    this.auth.loginGoogle()
  }

  logout() {
    this.auth.logout()
  }
}
