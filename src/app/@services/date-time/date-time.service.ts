import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() {
  }
  getDate() {
    const currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'fr');
    return currentDate;
 
  }
}
