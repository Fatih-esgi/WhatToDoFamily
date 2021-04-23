import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthServiceService } from 'src/app/@services/auth-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
userid;
  constructor(private auth : AuthServiceService){ 
 
  }

 async ngOnInit(){
this.userid = await this.auth.auth.user
return this.userid;
  }

  logout(){
    this.auth.logout()
  }
}

