import { EquirectangularReflectionMapping, SRGBColorSpace } from "three";
import configuration from "../data/configuration";
import AnimationsManager from "../managers/AnimationsManager";
import BaseObject from "./BaseObject";
import PVTracker from "./PVTracker";
import Sun from "./Sun";

export default class World extends BaseObject {
    _setup () {
        const model = this.stage.assets.get( 'terrain' );
        this.content = model.data.scene;
        this.clips = model.data.animations;
        this.stage.scene.add( this.content );

        this.addAnimations();
        this.addSun();

        if (configuration.shadow.enabled) {
            this.addShadow();
        }
    
        if (configuration.envMap.enabled) {
            this.setEnvMap();
        }

        this.setTrackers();

        this.stage.objectsToUpdate.push( this );
        // this.debug();
    }

    debug () {
        let index = 0;
        window.addEventListener('keydown', e => {
            if (e.key === "d") {
                console.log(this.content.children[index].name)
                this.content.children[index].clear();
                index += 1;
            }
        })
    }

    addSun () {
        this.sun = new Sun( this.stage );
    }

    addAnimations () {
        this.animationManager = new AnimationsManager( this.content, this.clips );
    }

    addShadow () {
        this.content.children.forEach( ( child, index ) => {
            if ( child.name.includes( "Ground" ) 
                || child.name.includes( "Floor" ) 
                || child.name.includes( "Road" )
                || child.name.includes( "Plane" )
                || child.name.includes( "Water" )
                || child.name.includes( "Park" ) 
                || child.name.includes( "Cube" ) ) {
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
        this.stage.scene.environmentIntensity = configuration.envMap.intensity;
    }

    setTrackers () {
        const name = "PV_Tracker_Active";
        this.pvTrackers = [];
        
        this.content.traverse( ( child, index ) => {
            if ( child.name.includes( name ) ) {
                this.pvTrackers.push(new PVTracker(child, this.stage.scene.environment, this.sun));
            }
        } );

        this.pvTrackers.forEach( pvTracker => pvTracker.prepare() );
    }

    update ( tick, delta ) {
        this.animationManager.update( delta );
        this.sun.update(tick);
        this.pvTrackers.forEach( tracker => tracker.update( tick ) );
    }
}
