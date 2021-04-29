import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthServiceService } from 'src/app/@services/authentication/auth-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(
    public auth : AngularFireAuth,
    private log : AuthServiceService
    ){}

    login(){
      this.log.loginGoogle();
    }
    
    logout(){
      this.log.logout();
    }

}