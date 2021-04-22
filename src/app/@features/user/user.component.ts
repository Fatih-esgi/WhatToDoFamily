import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthServiceService } from 'src/app/@services/auth-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private auth : AuthServiceService){ 

  }

  ngOnInit(): void {

  }

  logout(){
    this.auth.logout()
  }
}
