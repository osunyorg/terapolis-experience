import { Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import LightManager from './managers/LightManager';
import CameraManager from './managers/CameraManager';
import configuration from './data/configuration';
import SceneManager from './managers/SceneManager';

export default class Stage {
    constructor () {
        this.addRenderer();
        this.addScene();
        this.addCamera();
        this.addControls();
        this.addLights();
        this.resize();
        this.load();

        window.addEventListener( 'resize', this.resize.bind( this ) );
    }
    addRenderer () {
        this.renderer = new WebGLRenderer( configuration.renderer );
        this.rendererSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.renderer.setSize( this.rendererSize.width, this.rendererSize.height );
        document.body.appendChild( this.renderer.domElement );
    }
    addScene () {
        this.sceneManager = new SceneManager( this );
        this.scene = this.sceneManager.getScene();
    }
    addCamera () {
        this.cameraManager = new CameraManager( this );
        this.camera = this.cameraManager.getCamera();
    }
    addControls () {
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    }
    addLights () {
        this.lightManager = new LightManager( this );
    }
    resize () {
        this.rendererSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        this.renderer.setSize( this.rendererSize.width, this.rendererSize.height );
        this.cameraManager.resize();
    }
    load () {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/assets/loader/draco/' );
        loader.setDRACOLoader( dracoLoader );

        loader.load(
            '/assets/3D/terrain.glb',
            ( gltf ) => {
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
    }

    loop () {
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }
}