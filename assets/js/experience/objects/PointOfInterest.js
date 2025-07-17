import { Object3D, Vector2, Vector3 } from "three";
import POIContentManager from "js/interface/POIContentManager";

export default class PointOfInterest {
    constructor (data, manager) {
        this._data = data;
        this._manager = manager;
        this._stage = this._manager.stage;
        this._display = true;
        this._worldPosition = new Vector3();
        this._position2D = new Vector2();
        this._isInRange = false;

        this._setup();
    }
    _setup () {
        // this._createDebug();
        this._createDomElement();
    }
    _createDebug () {
        this._object = new Object3D();
        this._object.position.copy(this._data.position);
        this._stage.scene.add(this._object);
    }
    _updateDomPosition () {
        // this._object.getWorldPosition( this._worldPosition );
        this._worldPosition.copy(this._data.position)
        this._worldPosition.project( this._stage.camera );
        this._position2D.x = ((this._worldPosition.x + 1) / 2) * this._stage.size.width;
        this._position2D.y = (-(this._worldPosition.y - 1) / 2) * this._stage.size.height;
        this.element.style.left = this._position2D.x + 'px';
        this.element.style.top = this._position2D.y + 'px';
        // console.log( this._position2D );
    }
    _createDomElement () {
        this.element = document.createElement('div');
        this.element.classList.add('poi-button');
        this._stage.container.append(this.element);

        this._bindClick();
    }
    _bindClick () {
        this.element.addEventListener('click', this._onClick.bind(this));
    }
    _onClick () {
        this._stage.cameraManager.focusOn(this._data.position);
        setTimeout(() => {
            POIContentManager.open(this._data.id);
        }, 1200);

    }
    update () {
        this._updateDomPosition();
        // const objectInFrustum = this._stage.stage.cameraManager.isObjectInFrustum(this._object)
        
        // if (this._isInRange && objectInFrustum && !this._display) {
        //     this.display = true
        // } else if ((!this._isInRange || !objectInFrustum) && this._display) {
        //     this.display = false
        // }
    }

}