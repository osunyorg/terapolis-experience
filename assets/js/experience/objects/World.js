import { Color, EquirectangularReflectionMapping, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, SRGBColorSpace } from "three";
import configuration from "../data/configuration";
import AnimationsManager from "../managers/AnimationsManager";
import BaseObject from "./BaseObject";
import PVTracker from "./PVTracker";
import SkyBox from './SkyBox';
import Sun from "./Sun";

export default class World extends BaseObject {
    _setup () {
        const model = this.stage.assets.get( 'terrain' );
        this.content = model.data.scene;
        this.clips = model.data.animations;
        this.stage.scene.add( this.content );

        this.addAnimations();
        this.addSky();

        if (configuration.shadow.enabled) {
            this.addShadow();
        }
    
        if (configuration.envMap.enabled) {
            this.setEnvMap();
        }

        this.setTrackers();

        // this.setWater();

        this.stage.objectsToUpdate.push( this );
        // this.debug();
    }

    debug () {
        let index = 0;
        window.addEventListener('keydown', e => {
            if (e.key === "d") {
                this.content.children[index].clear();
                index += 1;
            }
        })
    }

    addSky () {
        this.sun = new Sun( this.stage );
        this.skyBox = new SkyBox( this.stage, this.sun );
    }

    setWater () {
        this.water = this.content.getObjectByName("Water");
        // console.log(this.water);
        // this.water.material = new MeshToonMaterial({
        //     color: 0x0000FF
        // });

        let color = new Color().copy(this.water.material.color)

        // this.water.material = new MeshPhysicalMaterial({
        //     // roughness: 0.3,
        //     // metalness: 0.5,
        //     color: color,
        //     clearcoat: 1.0,
        //     clearcoatRoughness: 0.0,
        //     envMapIntensity: 1.0,
        //     envMap: this.stage.scene.environment,
        // });

        this.water.material.envMap = this.stage.scene.environment
        this.water.material.roughness = 0.05;
        this.water.material.metalness = 0.3;
        this.water.material.envMapIntensity = 1.0;
        this.water.material.emissiveIntensity = 0.0;
        this.water.material.needsUpdate = true;

        // console.log(this.water.material)
    }

    addAnimations () {
        this.animationManager = new AnimationsManager( this.content, this.clips );
    }

    addShadow () {
        this.content.traverse(( child, index ) => {
            if ( child.name.includes( "Ground" ) 
                || child.name.includes( "Floor" ) 
                || child.name.includes( "Road" )
                || child.name.includes( "Plane" )
                || child.name.includes( "Water" )
                || child.name.includes( "Park" ) 
                || child.name.includes( "Cube" )
            ) {
                child.receiveShadow = true;
            } else {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        } );
    }

    setEnvMap () {
        // Set envmap
        const envMapAsset = this.stage.assets.get( 'environment' );
        this.envMap = envMapAsset.data;
        this.envMap.mapping = EquirectangularReflectionMapping;
        this.envMap.colorSpace = SRGBColorSpace;
        this.stage.scene.environment = this.envMap;
        this.stage.scene.environmentIntensity = configuration.envMap.intensity;
    }

    setTrackers () {
        const name = "PV_Tracker_Active";
        const envMapAsset = this.stage.assets.get('environment');
        const envMap = envMapAsset.data;
        this.pvTrackers = [];
        
        this.content.traverse( ( child, index ) => {
            if ( child.name.includes( name ) ) {
                this.pvTrackers.push( new PVTracker( child, envMap, this.sun ) );
            }
        } );

        this.pvTrackers.forEach( pvTracker => pvTracker.prepare() );
    }

    update ( tick, delta ) {
        this.animationManager.update( delta );
        this.sun.update( tick );
        this.skyBox.update();
        this.pvTrackers.forEach( tracker => tracker.update( tick ) );
    }
}
