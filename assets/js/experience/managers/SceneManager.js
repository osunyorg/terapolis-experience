import { Color, Fog, Scene } from "three";
import configuration from "../data/configuration";
import BaseManager from "./BaseManager";

export default class SceneManager extends BaseManager {
    _setup () {
        this._scene = new Scene();

        this._backgroundColor = new Color( configuration.sceneEnvBackground.color );
        this._scene.background = this._backgroundColor;

        // Set fog
        if ( configuration.sceneFog.enabled ) {
            this._setFog();
        }
    }
    _setFog () {
        this._fog = new Fog(
            configuration.sceneFog.color,
            configuration.sceneFog.near,
            configuration.sceneFog.far
        );
        this._scene.fog = this._fog;
    }
    getScene () {
        return this._scene;
    }
}