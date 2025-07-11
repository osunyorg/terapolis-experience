import { PerspectiveCamera } from "three";
import configuration from "../data/configuration";
import BaseManager from "./BaseManager";

export default class CameraManager extends BaseManager {
    _setup () {
        this._camera = new PerspectiveCamera(
            configuration.camera.fov, 
            this.stage.size.width / this.stage.size.height, 
            configuration.camera.near, configuration.camera.far);
        this._camera.position.copy(configuration.camera.position);
    }
    getCamera () {
        return this._camera;
    }
    resize () {
        this._camera.aspect = this.stage.size.width / this.stage.size.height;
        this._camera.updateProjectionMatrix();
    } 
}