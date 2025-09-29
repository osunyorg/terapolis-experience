import { Clock, PCFSoftShadowMap, Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import LightManager from './managers/LightManager';
import CameraManager from './managers/CameraManager';
import configuration from './data/configuration';
import SceneManager from './managers/SceneManager';
import POIManager from './managers/POIManager';
import { EventEmitter } from 'events';
import events from './data/events';
import AssetsManager from './managers/AssetsManager';
import World from './objects/World';
import { Easing, Tween } from '@tweenjs/tween.js';

class Stage extends EventEmitter {
    constructor () {
        super();
        this.objectsToUpdate = [];
        this.container = document.querySelector( '#experience-container' );

        this.addRenderer();
        this.addScene();
        this.addLights();
        this.addPOI();
        this.addCamera();

        this.assets = new AssetsManager( this.onAssetsLoaded.bind( this ) );

        this.resize();
        this.listen();

        window.addEventListener( 'resize', this.resize.bind( this ) );
    }
    listen () {
        this.on( events.POI_CLOSE, () => {
            this.cameraManager.blur();
        });
    }
    addRenderer () {
        this.renderer = new WebGLRenderer( configuration.renderer );
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.renderer.setSize( this.size.width, this.size.height );

        if ( configuration.renderer.toneMappingEnabled ) {
            this.renderer.toneMapping = configuration.renderer.toneMapping;
            this.renderer.toneMappingExposure = configuration.renderer.toneMappingExposure;
            this.renderer.physicallyCorrectLights = true;
        }
        
        this.container.appendChild( this.renderer.domElement );

        this.clock = new Clock();
    }
    addScene () {
        this.sceneManager = new SceneManager( this );
        this.scene = this.sceneManager.getScene();
    }
    addCamera () {
        this.cameraManager = new CameraManager( this );
        this.camera = this.cameraManager.getCamera();
    }
    addLights () {
        this.lightManager = new LightManager( this );
    }
    addPOI () {
        this.POIManager = new POIManager( this );
        this.objectsToUpdate.push( this.POIManager );
    }
    resize () {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        this.renderer.setSize( this.size.width, this.size.height );
        this.cameraManager.resize();
    }

    onAssetsLoaded () {
        this.addWorld();
        this.onReady();
    }

    addWorld () {
        this.world = new World( this );
    }

    onReady () {
        this.renderer.setAnimationLoop( this.loop.bind( this ) );

        if (configuration.shadow.enabled) {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = configuration.shadow.type;
        }

        this.hideLoader();
    }

    hideLoader () {
        let opacity = {value: 1};
        const loader = document.getElementById('loader'),
            tween = new Tween( opacity );

        tween.to({value: 0}, 500)
            .onUpdate(() => {
                loader.style.opacity = opacity.value;
            })
            .onComplete(() => {
                loader.style.display = 'none';
            })
            .start();

        this.objectsToUpdate.push(tween)
    }

    loop () {
        const delta = this.clock.getDelta();
        const tick = window.performance.now();
        this.renderer.render( this.scene, this.camera );
        this.objectsToUpdate.forEach(object => object.update( tick, delta ));
    }
}

const instancedStage = new Stage();

export default instancedStage;