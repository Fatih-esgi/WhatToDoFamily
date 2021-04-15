import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  like:boolean = true;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  
  constructor() { }

  ngOnInit(): void {
  }
  share(){
    console.log('clicked share');
    
  }
  addToFavorites(){
    console.log('clicked favorites');
    if (this.like == true) {
      this.like = false;
    } else {
      this.like = true;
    }
  }
}
