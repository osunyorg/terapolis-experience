import { AmbientLight,CameraHelper,Color,DirectionalLight, HemisphereLight, PointLight } from 'three';
import configuration from '../data/configuration';
import BaseManager from './BaseManager';

export default class LightManager extends BaseManager {
    _setup () {
        this.lights = [];
        this.colors = {
            current: new Color( configuration.sun.startColor ),
            start: new Color( configuration.sun.startColor ),
            end: new Color( configuration.sun.endColor )
        };

        this.addAmbient();
        this.addDirectional();
        this.addSun();
        this.addHemi();
        this.stage.objectsToUpdate.push( this );

        this.lights.forEach(
            light => this.stage.scene.add(light)
        );

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

    addSun () {
        this.sun = new PointLight( 0xFFFFFF, 5, 100, 0.2 );
        this.sun.position.set( 0, 30, 4 );

        if ( configuration.shadow.enabled ) {
            this.sun.castShadow = true; // default false
            //Set up shadow properties for the this.sun
            this.sun.shadow.mapSize.width = 512; // default
            this.sun.shadow.mapSize.height = 512; // default
            this.sun.shadow.camera.near = 0.5; // default
            this.sun.shadow.camera.far = 1000; // default
            // this.sun.shadow.blurSamples = 10;
            const helper = new CameraHelper( this.sun.shadow.camera );
            this.stage.scene.add( helper );
        }
        this.lights.push( this.sun );

    }

    setColors (color) {
        this.lights.forEach(
            light => light.color.copy(color)
        );
    }

    update ( tick ) {
        // const progression = Math.max(0, this.sun.position.y / configuration.sun.distance);
        // const progression = (1 + Math.sin( tick * configuration.sun.speed ) ) / 2;
        // const progression = 1 - (tick *  configuration.sun.speed / 4 % 1) //sawtooth
        const progression = Math.max(0, Math.cos( tick * configuration.sun.speed ));
        this.sun.position.x = Math.sin( tick * configuration.sun.speed ) * configuration.sun.distance;
        this.sun.position.y = progression * configuration.sun.distance;
        this.sun.intensity = progression * configuration.sun.intensity;

        this.colors.current.lerpColors(this.colors.start, this.colors.end, progression);
        this.sun.color.copy(this.colors.current);
        // this.setColors(this.colors.current);
    }
}