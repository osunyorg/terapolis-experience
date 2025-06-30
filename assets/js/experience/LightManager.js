import * as THREE from 'three';

export default class LightManager {
    constructor (stage) {
        this.stage = stage;
        this.lights = [];
        this.addLights();
    }
    addLights () {
        const light1 = new THREE.AmbientLight();
        this.stage.scene.add(light1);

        const light2 = new THREE.DirectionalLight();
        light2.position.set(1, 5, -1); // ~60º
        this.stage.scene.add(light2);
    }
}