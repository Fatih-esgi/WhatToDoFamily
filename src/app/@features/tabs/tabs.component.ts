import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/@services/auth-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(  private _checkLogin: AuthServiceService) { 
    this._checkLogin.auth.user;
 console.log(this._checkLogin.auth.user); 
 }

  ngOnInit(): void {
  }

}
