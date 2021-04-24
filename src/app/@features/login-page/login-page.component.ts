import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/@services/authentication/auth-service.service';
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
      public auth: AuthServiceService,
      public authcheck: AngularFireAuth,
      private route: Router
    ) { }

  ngOnInit(): void {
    console.log(this.authcheck);

  }

  logingoogle() {
    this.auth.loginGoogle()
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['/home']);
  }
}
