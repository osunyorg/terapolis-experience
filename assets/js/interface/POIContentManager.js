import POIPopup from "./POIPopup";

class POIContentManager {
    constructor () {
        this.popins = [];
        this.elements = document.querySelectorAll('.poi-popup');
        this._create();
    }
    _create () {
        this.elements.forEach(element => {
            this.popins.push(new POIPopup(element));
        });
    }
    open (id) {
        this.popins.forEach(popin => {
            popin.toggle(false);
        });

        this.popins.forEach(popin => {
            if (popin.id === id) {
                popin.toggle();
            }
        });
    }
}

export default new POIContentManager();