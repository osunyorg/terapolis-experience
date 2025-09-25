import { Object3D, Vector2, Vector3 } from "three";
import POIContentManager from "js/interface/POIContentManager";
import POIButton from "js/interface/POIButton";

export default class PointOfInterest {

    constructor ( data, manager ) {
        this._data = data;
        this.id = data.id;
        this._manager = manager;
        this._stage = this._manager.stage;
        this._display = false;
        this._canDisplay = true;
        this.position = this._data.position;
        this._worldPosition = new Vector3();
        this._position2D = new Vector2();
        this._isInRange = false;

        this._setup();
    }

    _setup () {
        this.button = new POIButton(this._stage.container, () => {
            this._manager.open(this.id);
        });
    }

    focus () {
        this._stage.cameraManager.focusOn(this.position);
        setTimeout(() => {
            POIContentManager.open(this._data.introductionId);
        }, 1200);
    }

    disable () {
        this._canDisplay = false;
    }

    enable () {
        this._canDisplay = true;
    }

    _updateDomPosition () {
        this._worldPosition.copy( this.position );
        this._worldPosition.project( this._stage.camera );
        this._position2D.x = ( (this._worldPosition.x + 1) / 2 ) * this._stage.size.width;
        this._position2D.y = ( -(this._worldPosition.y - 1) / 2 ) * this._stage.size.height;
        this.button.move(this._position2D);
    }

    _isInFrustum () {
        return this._stage.cameraManager.isInFrustrum( this.position );
    }

    _updateVisibility () {
        const isInFrustrum = this._stage.cameraManager.isInFrustum(this.position);
        this._display = isInFrustrum && this._canDisplay;
        if (this._display) {
            this.button.show();
        } else {
            this.button.hide();
        }
    }

    update () {
        this._updateDomPosition();
        this._updateVisibility();
    }

}