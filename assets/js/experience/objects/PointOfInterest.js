import BaseObject from "./BaseObject";
export default class PointOfInterest {
    constructor (data, manager) {
        this._data = data;
        this._manager = manager;
        this._display = true;
        this._worldPosition = new Vector3();
        this._position2D = new Vector2();
        this._isInRange = false;

        this._setup();
    }
    _setup () {
        console.log(this._data);
    }
    _updateDomPosition() {
        this._object.getWorldPosition(this._worldPosition);
        this._worldPosition.project(this._manager.stage.camera);
        this._position2D.x = ((this._worldPosition.x + 1) / 2) * window.innerWidth;
        this._position2D.y = (-(this._worldPosition.y - 1) / 2) * window.innerHeight;
    }
    update () {
        this._updateDomPosition();
        // const objectInFrustum = this._manager.stage.cameraManager.isObjectInFrustum(this._object)
        
        // if (this._isInRange && objectInFrustum && !this._display) {
        //     this.display = true
        // } else if ((!this._isInRange || !objectInFrustum) && this._display) {
        //     this.display = false
        // }
    }

}