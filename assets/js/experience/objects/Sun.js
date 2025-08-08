import { AmbientLight,CameraHelper,Color,DirectionalLight, HemisphereLight, PointLight } from 'three';
import BaseObject from "./BaseObject";
import configuration from '../data/configuration';

export default class Sun extends BaseObject {
    _setup () {
        this.colors = {
            current: new Color( configuration.sun.startColor ),
            start: new Color( configuration.sun.startColor ),
            end: new Color( configuration.sun.endColor )
        };

        this.light = new PointLight( 0xFFFFFF, 5, 100, 0.2 );
        this.light.position.set( 0, 50, 4 );

        if ( configuration.shadow.enabled ) {
            this.light.castShadow = true; // default false
            //Set up shadow properties for the this.sun
            this.light.shadow.mapSize.width = configuration.shadow.size; // default
            this.light.shadow.mapSize.height = configuration.shadow.size; // default
            this.light.shadow.camera.near = 0.1; // default
            this.light.shadow.camera.far = 100; // default
            // this.sun.shadow.blurSamples = 10;
            const helper = new CameraHelper( this.light.shadow.camera );
            this.stage.scene.add( helper );
        }

        this.stage.scene.add( this.light );
    }

    update ( tick, delta ) {
        // const progression = Math.max(0, this.sun.position.y / configuration.sun.distance);
        // const progression = (1 + Math.sin( tick * configuration.sun.speed ) ) / 2;
        // const progression = 1 - (tick *  configuration.sun.speed / 4 % 1) //sawtooth
        const progression = Math.max(0, Math.cos( tick * configuration.sun.speed ));
        this.light.position.x = Math.sin( tick * configuration.sun.speed ) * -configuration.sun.distance;
        this.light.position.y = progression * configuration.sun.distance;
        this.light.intensity = progression * configuration.sun.intensity;

        this.colors.current.lerpColors(this.colors.start, this.colors.end, progression);
        this.light.color.copy(this.colors.current);
        // this.setColors(this.colors.current);
    }
}