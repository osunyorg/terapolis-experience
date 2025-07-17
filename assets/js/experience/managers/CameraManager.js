import { PerspectiveCamera, Vector3 } from "three";
import configuration from "../data/configuration";
import BaseManager from "./BaseManager";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Easing, Tween } from '@tweenjs/tween.js';

export default class CameraManager extends BaseManager {
    _setup () {
        this._camera = new PerspectiveCamera(
            configuration.camera.fov, 
            this.stage.size.width / this.stage.size.height, 
            configuration.camera.near, configuration.camera.far
        );
        this._camera.position.copy( configuration.camera.position );
        this._target = new Vector3( 0, 0, 0 );

        this.state = {
            isFocusing: false
        };

        this._addControls();
        this._addAnimationState();

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.stopFocus();
                console.log('ok')
            }
        })
    }
    _addAnimationState () {
        this._animationState = {
            target: this._target,
            distance: this.controls.maxDistance
        };
        this._animationTween = new Tween( this._animationState );
        this.stage.objectsToUpdate.push(this._animationTween);
    }
    _addControls () {
        this.controls = new OrbitControls( this._camera, this.stage.renderer.domElement );
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.15;
        this.controls.maxDistance = configuration.camera.distance.blur;
        this.controls.minDistance = configuration.camera.distance.blur;
        this.stage.objectsToUpdate.push( this.controls );
    }
    getCamera () {
        return this._camera;
    }
    resize () {
        this._camera.aspect = this.stage.size.width / this.stage.size.height;
        // this._camera.aspect = this.stage.size.width * 1.5 / this.stage.size.height;
        // this._camera.setViewOffset(this.stage.size.width*1.5, this.stage.size.height, this.stage.size.width*0.25, 0, this.stage.size.width, this.stage.size.height)
        
        this._camera.updateProjectionMatrix();
    }
    focusOn (position) {
        this.state.isFocusing = true;
        this._setFocus(position, configuration.camera.distance.focus);
        // this._camera.setViewOffset(this.stage.size.width*1.5, this.stage.size.height, 0, 0, this.stage.size.width, this.stage.size.height)
    }
    stopFocus () {
        this.state.isFocusing = false;
        this._setFocus({x: 0, y: 0, z: 0}, configuration.camera.distance.blur);
    }
    _setFocus (position, distance) {
        this._animationTween
            .to({
                target: {
                    x: position.x,
                    y: position.y,
                    z: position.z
                },
                distance: distance
            }, 1000)
            .easing(Easing.Quadratic.InOut)
            .onUpdate(() => {
                const { x, y, z } = this._animationState.target
                this._target.set( x, y, z );
                this.controls.target.copy(this._target);
                this.controls.minDistance = this._animationState.distance;
                this.controls.maxDistance = this._animationState.distance;
            })
            .start();
    }
    update () {
        this._animationTween.update();
    }
}