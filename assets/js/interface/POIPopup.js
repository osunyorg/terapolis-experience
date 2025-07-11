export default class POIPopup extends window.osuny.Popup {
    constructor(element) {
        super(element);
        this.id = element.id;
        this._listen();
    }
} 