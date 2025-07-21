import events from "js/experience/data/events";
import instancedStage from "js/experience/Stage";

export default class POIIntroductionPopup extends window.osuny.Popup {
    constructor(element, manager) {

        super(element);
        this.id = element.id;
        this._manager = manager;
        this._listen();

        this.openPopupButton = element.querySelector('[data-open-popup]');
        this.openPopupButton.addEventListener('click', this._openPopup.bind(this));

    }
    toggle (open, triggerElement, openingNextPopup) {

        if (this.state.opened === open) {
            return;
        }

        super.toggle(open, triggerElement);

        if (!this.state.opened && !openingNextPopup) {
            instancedStage.emit(events.POI_CLOSE);
        }
    }
    _openPopup () {
        const id = this.openPopupButton.getAttribute('data-open-popup');
        this.toggle(false, null, true)
        instancedStage.emit(events.POI_OPEN);
        this._manager.open(id);
    }
}