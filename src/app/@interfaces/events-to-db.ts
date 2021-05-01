export interface EventsToDb {

    eventTitle:string;
    eventCategory :number;
    eventStartDate:Date;
    eventEndDate:Date;
    eventAddress:string;
    eventCity:string;
    eventDescr:string;
    eventLat:string;
    eventLong:string;
    eventStates:string;
    infocost:number;
    infoDog:boolean;
    infoGen:string;
    infoHandicap:boolean;
    infoTransp:string;
    media1:string;
    media2?:string;
    media3?:string;
    media4?:string;
    media5?:string;
    media6?:string;
    orgAdress:string;
    orgCity:string;
    orgName:string;
    orgPhone:string;
    orgState:string;
    reqWeather:string;
}
