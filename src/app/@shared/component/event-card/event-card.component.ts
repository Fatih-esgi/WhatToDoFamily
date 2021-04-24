import { Component, Input, OnInit } from '@angular/core';
import { GeoService } from 'src/app/@services/gelocation/geo.service';

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

  distBetween;

  rmvfav:boolean;
  removeFav;

  constructor(
    public _userPosition$ : GeoService
  ) {
    
  }
  
  ngOnInit(): void {
    this.distBetween = this._userPosition$.getdistance(this.eventLat,this.eventLong,"k")
    console.log(this.distBetween);
    
    this.rmvfav = this.removeFav;
  }

}
