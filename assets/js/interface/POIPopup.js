import events from 'js/experience/data/events';
import instancedStage from 'js/experience/Stage';

export default class POIPopup extends window.osuny.Popup {
    constructor(element) {
        super(element);
        this.id = element.id;
        this._listen();
    }
    toggle (open, triggerElement) {

        if (this.state.opened === open) {
            return;
        }

        super.toggle(open, triggerElement);

        if (!this.state.opened) {
            instancedStage.emit(events.POI_CLOSE);
        }
    }
} 