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
  noRating:boolean;

  constructor(
    public _userPosition$: GeoService
  ) { }

  ngOnInit(): void {
    console.log('eventcard thisevent', this.event);
    this.distBetween = this._userPosition$.getdistance(this.event.eventLat, this.event.eventLong, "K")

    console.log('raters',this.event.raters);
    console.log('rat',this.event.ratingGlobal);
    
    if (this.event.raters == 0) {
      this.ratingValue = 0
    }
    else {
      this.noRating = false
      this.ratingValue = this.event.ratingGlobal / this.event.raters
    }
  }

}
