import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() id: string;
  @Input() dateB: Date;
  @Input() dateE: Date;
  @Input() title:string;
  @Input() avgRating:string;
  @Input() eventLat:number;
  @Input() eventLong:number;
  @Input() eventDog: boolean;
  @Input() eventhandicap: boolean;
  @Input() meteoReq: string;
  @Input() media1: string;
  
  rmvfav:boolean;
  removeFav;
  
  constructor() {}

  ngOnInit(): void {
    this.rmvfav = this.removeFav;
  }

}
