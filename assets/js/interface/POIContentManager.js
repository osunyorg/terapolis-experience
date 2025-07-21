import POIPopup from "./POIPopup";
import POIIntroductionPopup from "./POIIntroductionPopup";

class POIContentManager {
    constructor () {
        this.popups = [];
        this.elements = document.querySelectorAll('.poi-popup');
        this.introductions = document.querySelectorAll('.poi-introduction-popup');
        this._create();
    }
    _create () {
        this.elements.forEach(element => {
            this.popups.push(new POIPopup(element));
        });

        this.introductions.forEach(element => {
            this.popups.push(new POIIntroductionPopup(element, this));
        });
    }
    closeAll () {
        this.popups.forEach( popin => {
            if ( popin.state.opened ) {
                popin.toggle( false );
            }
        });
    }
    open ( id ) {
        this.closeAll();

        this.popups.forEach( popin => {
            if ( popin.id === id ) {
                popin.toggle();
            }
        });
    }
}

export default new POIContentManager();