import { EquirectangularReflectionMapping, SRGBColorSpace } from "three";
import configuration from "../data/configuration";
import AnimationsManager from "../managers/AnimationsManager";
import BaseObject from "./BaseObject";
import PVTracker from "./PVTracker";

export default class World extends BaseObject {
    _setup () {
        const model = this.stage.assets.get( 'terrain' );
        this.content = model.data.scene;
        this.clips = model.data.animations;
        this.stage.scene.add( this.content );
        this.stage.objectsToUpdate.push( this );
        this.addAnimations();

        if (configuration.shadow.enabled) {
            this.addShadow();
        }

        this.setEnvMap();
        this.setTrackers();
    }

    addAnimations () {
        this.animationManager = new AnimationsManager( this.content, this.clips );
    }

    addShadow () {
        this.content.children.forEach( ( child, index ) => {
            if ( child.name.includes( "Ground" ) ) {
                console.log(child)
                child.receiveShadow = true;
            } else {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        } );
    }

    setEnvMap () {
        // Set envmap
        const envMapAsset = this.stage.assets.get('environment-1');
        const envMap = envMapAsset.data;
        envMap.mapping = EquirectangularReflectionMapping;
        envMap.colorSpace = SRGBColorSpace;

        this.stage.scene.environment = envMapAsset.data;
    }

    setTrackers () {
        const name = "PV_Tracker";
        const sun = this.stage.lightManager.sun;
        this.pvTrackers = [];
        this.content.children.forEach( ( child, index ) => {
            if ( child.name.includes( name ) ) {
                this.pvTrackers.push(new PVTracker(child, this.stage.scene.environment, sun));
            }
        } );
    }

    update ( tick, delta ) {
        this.animationManager.update( delta );
        this.pvTrackers.forEach(tracker => tracker.update( tick ));
    }
}