export default class BaseManager {
    constructor ( stage ) {
        this.stage = stage;
        this._setup();
    }
    _setup () {
        // to be override
    }
}