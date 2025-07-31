import { AmbientLight,CameraHelper,DirectionalLight, PointLight } from 'three';
import configuration from '../data/configuration';
import BaseManager from './BaseManager';

export default class LightManager extends BaseManager {
    _setup () {
        this.lights = [];

        this.addAmbient();

        if (configuration.shadow.enabled) {
            this.addSun();
            this.stage.objectsToUpdate.push( this );
        } else {
            this.addDirectional();
        }

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

    addSun () {
        this.sun = new PointLight( 0xffffff, 5, 100, 0.2 );
        this.sun.position.set( 0, 30, 4 );
        this.sun.castShadow = true; // default false

        //Set up shadow properties for the this.sun
        this.sun.shadow.mapSize.width = 512; // default
        this.sun.shadow.mapSize.height = 512; // default
        this.sun.shadow.camera.near = 0.5; // default
        this.sun.shadow.camera.far = 1000; // default
        // this.sun.shadow.blurSamples = 10;
        this.lights.push( this.sun );

        const helper = new CameraHelper( this.sun.shadow.camera );
        this.stage.scene.add( helper );
    }

    update ( tick ) {
        this.sun.position.x = Math.sin(tick / 1000) * 10;
    }
}