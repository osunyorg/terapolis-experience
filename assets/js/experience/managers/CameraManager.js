import { PerspectiveCamera } from "three";
import configuration from "../data/configuration";

export default class CameraManager {
    constructor (stage) {
        this.stage = stage;
        this._setup();
    }
    _setup () {
        this.camera = new PerspectiveCamera(
            configuration.camera.fov, 
            this.stage.rendererSize.width / this.stage.rendererSize.height, 
            configuration.camera.near, configuration.camera.far);
        this.camera.position.copy(configuration.camera.position);
    }
    resize () {
        this.camera.aspect = this.stage.rendererSize.width / this.stage.rendererSize.height;
        this.camera.updateProjectionMatrix();
    } 
}