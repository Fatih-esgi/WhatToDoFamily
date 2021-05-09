import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  user;
  constructor(public auth: AngularFireAuth) {


  }
  async ngOnInit() {

    return this.user = await this.auth.user.toPromise().then(x => {
      x.uid
    }
    )
    console.log('user', this.user);

  }

}
