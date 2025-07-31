import { PCFSoftShadowMap, Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import LightManager from './managers/LightManager';
import CameraManager from './managers/CameraManager';
import configuration from './data/configuration';
import SceneManager from './managers/SceneManager';
import POIManager from './managers/POIManager';
import { EventEmitter } from 'events';
import events from './data/events';

class Stage extends EventEmitter {
    constructor () {
        super();
        this.objectsToUpdate = [];
        this.container = document.querySelector( '#experience-container' );
        this.addRenderer();
        this.addScene();
        this.addCamera();
        this.addLights();
        this.addPOI();
        this.resize();
        this.load();
        this.listen();

        window.addEventListener( 'resize', this.resize.bind( this ) );
    }
    listen () {
        this.on(events.POI_CLOSE, () => {
            this.cameraManager.blur()
        });
    }
    addRenderer () {
        this.renderer = new WebGLRenderer( configuration.renderer );
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.renderer.setSize( this.size.width, this.size.height );
        this.container.appendChild( this.renderer.domElement );
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
    addShadow () {
        console.log(this.mainObject)

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = configuration.shadow.type;

        this.mainObject.children.forEach( ( child, index ) => {
            if ( child.name.includes( "Ground" ) ) {
                console.log(child)
                child.receiveShadow = true;
            } else {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        } );
    }
    resize () {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        this.renderer.setSize( this.size.width, this.size.height );
        this.cameraManager.resize();
    }
    load () {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/assets/loader/draco/' );
        loader.setDRACOLoader( dracoLoader );

        loader.load(
            '/assets/3D/terrain_1.glb',
            ( gltf ) => {
                this.mainObject = gltf.scene;
                this.scene.add( gltf.scene );
                this.onReady();
            },
            ( xhr ) => {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            ( error ) => {
                console.log( error );
            }
        );
    }

    onReady () {
        this.renderer.setAnimationLoop( this.loop.bind( this ) );

        if (configuration.shadow.enabled) {
            this.addShadow();
        }
    }

    loop () {
        const tick = performance.now();
        this.renderer.render( this.scene, this.camera );

        this.objectsToUpdate.forEach(object => object.update(tick));
    }
}

const instancedStage = new Stage();

export default instancedStage;