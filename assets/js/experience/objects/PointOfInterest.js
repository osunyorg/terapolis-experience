import { Object3D, Vector2, Vector3 } from "three";
import POIContentManager from "js/interface/POIContentManager";

export default class PointOfInterest {
    constructor (data, manager) {
        this._data = data;
        this._manager = manager;
        this._stage = this._manager.stage;
        this._display = false;
        this._position = this._data.position;
        this._worldPosition = new Vector3();
        this._position2D = new Vector2();

        this._isInRange = false;

        this._setup();
    }
    _setup () {
        this._createDomElement();
    }
    _createDomElement () {
        this.element = document.createElement('button');
        this.element.classList.add('poi-button');
        this.element.setAttribute('type', 'button');
        this._stage.container.append(this.element);

        this._bindClick();
    }
    _bindClick () {
        this.element.addEventListener('click', this._onClick.bind(this));
    }
    _onClick () {
        this._stage.cameraManager.focusOn(this._data.position);
        setTimeout(() => {
            POIContentManager.open(this._data.introductionId);
        }, 1200);
    }
    _updateDomPosition () {
        this._worldPosition.copy( this._position )
        this._worldPosition.project( this._stage.camera );
        this._position2D.x = ( (this._worldPosition.x + 1) / 2 ) * this._stage.size.width;
        this._position2D.y = ( -(this._worldPosition.y - 1) / 2 ) * this._stage.size.height;
        this.element.style.left = this._position2D.x + 'px';
        this.element.style.top = this._position2D.y + 'px';
    }
    _isInFrustum () {
        return this._stage.cameraManager.isInFrustrum( this._position );
    }
    _updateVisibility () {
        const isInFrustrum = this._stage.cameraManager.isInFrustum(this._position);
        this._display = isInFrustrum;
        this.element.style.display = this._display ? "block" : "none";
    }
    update () {
        this._updateDomPosition();
        this._updateVisibility();
    }

}