import { AmbientLight,DirectionalLight } from 'three';
import configuration from '../data/configuration';
import BaseManager from './BaseManager';

export default class LightManager extends BaseManager {
    _setup () {
        this.lights = [];

        this.addAmbient();
        this.addDirectional();

        this.lights.forEach(
            light => this.stage.scene.add(light)
        );
    }

    addAmbient () {
        const ambientLight = new AmbientLight(  configuration.lights.ambient );
        this.lights.push(ambientLight);
    }

    addDirectional () {
        const directionalLight = new DirectionalLight( configuration.lights.directional );
        directionalLight.position.copy( configuration.lights.directional.position );
        this.lights.push(directionalLight);
    }
}