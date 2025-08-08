import { AmbientLight,CameraHelper,Color,DirectionalLight, HemisphereLight, PointLight } from 'three';
import configuration from '../data/configuration';
import BaseManager from './BaseManager';

export default class LightManager extends BaseManager {
    _setup () {
        this.lights = [];
        
        this.addAmbient();
        this.addDirectional();
        this.addHemi();
        
        this.lights.forEach(
            light => this.stage.scene.add(light)
        );

        this.stage.objectsToUpdate.push( this );
    }

    addAmbient () {
        this.ambientLight = new AmbientLight(  configuration.lights.ambient );
        this.lights.push(this.ambientLight);
    }

    addDirectional () {
        this.directionalLight = new DirectionalLight( configuration.lights.directional );
        this.directionalLight.position.copy( configuration.lights.directional.position );
        this.lights.push(this.directionalLight);
    }

    addHemi () {
        const hemi = new HemisphereLight( 0x99DDFF, 0x669933, 1 / 3 );
        this.lights.push(hemi);
    }

    update () {
        //
    }
}