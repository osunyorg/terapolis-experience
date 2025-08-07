import events from "../data/events";
import POI from "../data/POI";
import PointOfInterest from "../objects/PointOfInterest";
import BaseManager from "./BaseManager";

export default class POIManager extends BaseManager {
    _setup () {
        this.POIs = [];

        POI.forEach( poiData => this._add( poiData ) );

        this.stage.on( events.POI_CLOSE, () => {
            this.enableAllPOI();
        });
    }
    _add ( poiData ) {
        const poi = new PointOfInterest( poiData, this );
        this.POIs.push( poi );
    }
    open ( id ) {
        this.POIs.forEach( poi => {
            if ( poi.id === id ) {
                poi.focus();
            } else {
                poi.disable();
            }
        });
    }

    enableAllPOI () {
        this.POIs.forEach( poi => {
            poi.enable();
        });
    }

    update () {
        this.POIs.forEach( poi => poi.update() );
    }
}