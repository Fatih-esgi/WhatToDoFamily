import { Component, Input, OnInit, } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthServiceService } from 'src/app/@services/authentication/auth-service.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userId;

  @Input() 
  pageTitle: string;
  backTo?;

  constructor( 
    public auth : AngularFireAuth,
    private log : AuthServiceService
    ) {}

 ngOnInit(){
      }
    
      login(){
        this.log.loginGoogle();
      }
      
      logout(){
        this.log.logout();
      }

}
