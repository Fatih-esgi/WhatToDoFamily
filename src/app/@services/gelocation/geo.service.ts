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
// fonction de calcul complexe --> calcule la distance entre deux points gps

  async getdistance(lat2, lon2, unit) {
let lat1;
let lon1;
   await this.getPosition().then(r =>{
      lat1 =r.lat ;
    lon1 = r.long;   
   })
   
//  console.log('------latlonuserdistance',this.getPosition(),lat2,lon2);
 
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      const radlat1 = Math.PI * lat1/180;
      const radlat2 = Math.PI * lat2/180;
      const theta = lon1-lon2;
      const radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }
}
