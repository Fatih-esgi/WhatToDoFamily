import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  async getPosition(): Promise<{lat: number, long: number}> {
    const position = await Geolocation.getCurrentPosition();
    return {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
  }
}
