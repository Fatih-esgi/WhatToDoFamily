import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  rmvfav:boolean;
  @Input() 
  id: string;
  imgUrl;
  statut: number;
  removeFav :boolean;
  
  constructor() { 
    console.log(this.imgUrl);
    
  }

  ngOnInit(): void {
    this.rmvfav = this.removeFav;
  }

}
