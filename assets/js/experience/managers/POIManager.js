import POI from "../data/POI";
import PointOfInterest from "../objects/PointOfInterest";
import BaseManager from "./BaseManager";

export default class POIManager extends BaseManager {
    _setup () {
        this.POIs = [];

        POI.forEach(poiData => this._add( poiData ));
    }
    _add (poiData) {
        const poi = new PointOfInterest( poiData, this );
        this.POIs.push( poi );
    }
    update () {
        this.POIs.forEach( poi => poi.update() );
    }
}