import { Component, Input, OnInit } from '@angular/core';
import { GeoService } from 'src/app/@services/gelocation/geo.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() event: any;

  distBetween;
  ratingValue: number;
  rmvoption: boolean;


  constructor(
    public _userPosition$: GeoService
  ) { }

  ngOnInit(): void {
    console.log('eventcard thisevent',this.event);
    this.distBetween = this._userPosition$.getdistance(this.event.eventLat, this.event.eventLong, "K")
    this.ratingValue = this.event.ratingGlobal / this.event.raters

  }

}
