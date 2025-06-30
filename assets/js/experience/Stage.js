import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class Stage {
    constructor () {
        this.addScene();
        this.addCamera();
        this.addRenderer();
        this.addControls();
        this.addLights();
        this.load();
    }
    addScene () {
        this.scene = new THREE.Scene();
    }
    addCamera () {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
        this.camera.position.x = 5;
        this.camera.position.y = 18;
        this.camera.position.z = 10;
    }
    addRenderer () {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        // this.renderer.toneMapping = Number(state.toneMapping);
        // this.renderer.toneMappingExposure = Math.pow(2, state.exposure);
        document.body.appendChild( this.renderer.domElement );
    }
    addControls () {
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    }
    addLights () {
        const light1 = new THREE.AmbientLight();
        this.scene.add(light1);

        const light2 = new THREE.DirectionalLight();
        light2.position.set(1, 5, -1); // ~60º
        this.scene.add(light2);
    }
    load () {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/assets/loader/draco/' );
        loader.setDRACOLoader( dracoLoader );

        loader.load(
            '/assets/3D/terrain.glb',
            ( gltf ) => {
                console.log(gltf)
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
        this.renderer.setAnimationLoop( this.loop.bind(this) );
    }
    loop () {
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }
}