import { AmbientLight,CameraHelper,Color,DirectionalLight, HemisphereLight, Object3D, PointLight, Vector3 } from 'three';
import BaseObject from "./BaseObject";
import configuration from '../data/configuration';
import { Easing, Tween } from '@tweenjs/tween.js';
import smoothValue from '../helpers/smoothValue';

export default class Sun extends BaseObject {
    _setup () {
        this._container = new Object3D();
        this._tick = 0;
        this._target = new Vector3(0, 0, 0);
        this._maxPolarAngle = (Math.PI * 1.2 * (1 / configuration.sun.speed)); 
        this.progression = 0;
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

        this._container.add( this.light );
        this._container.rotation.y = -Math.PI / 4;
        this.stage.scene.add( this._container );
    }

    update ( tick, delta ) {
        this._tick = tick % this._maxPolarAngle - (this._maxPolarAngle / 2);
        const cosinus = Math.cos( this._tick * configuration.sun.speed ),
            sinus = Math.sin( this._tick * configuration.sun.speed );

        this.progression = smoothValue(this.progression, (( sinus + 1 ) / 2) );
        this.light.position.x = sinus * -configuration.sun.distance;
        this.light.position.y = cosinus * configuration.sun.distance;
        this.light.intensity = cosinus * configuration.sun.intensity;

        this.colors.current.lerpColors(this.colors.start, this.colors.end, this.progression);

        console.log(Math.sin( this._tick * configuration.sun.speed ))
        this.light.color.copy(this.colors.current);

        this.light.shadow.camera.lookAt(this._target);

        this.stage.scene.environmentRotation.x = this.progression;
    }
}