import {
    AxesHelper,
    BackSide,
    BoxGeometry,
    Color,
    EquirectangularReflectionMapping,
    LinearFilter,
    LinearMipMapLinearFilter,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    PlaneGeometry,
    ShaderLib,
    ShaderMaterial,
    SRGBColorSpace,
} from "three";
import configuration from "../data/configuration";
import smoothValue from "../helpers/smoothValue";

export default class PVTracker {
    constructor ( mesh, envMap, sun ) {
        this.mesh = mesh;
        this.sun = sun;
        this._shader = ShaderLib.equirect;
        this._rotation = 0;
        // console.log(this.mesh)
        // this.mesh.material = new MeshStandardMaterial({
        //   roughness: 0.0,
        //   metalness: 0.7,
        //   envMapIntensity: 1.0,
        //   color: 0xaaaaaa,
        //   envMap: envMap,
        // });
        // this.mesh.material.needsUpdate = true;

        // const envMapAsset = this.stage.assets.get('environment');
        // const envMap = envMapAsset.data;
        // this.mesh.material.envMap = envMap;
    }

    prepare () {
        this.container = new Object3D();

        this.mesh.parent.add( this.container );
        // this.container.add(  new AxesHelper( 6 ) );

        this.container.rotation.copy( this.mesh.rotation );
        this.container.position.copy( this.mesh.position );

        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.set(0, 0, 0);
        this.container.add(this.mesh);
    }

    update(tick, delta) {
        let rotation = Math.sin(this.sun._tick * configuration.sun.speed) * configuration.pvTracker.rotation;
        this._rotation = smoothValue(this._rotation, rotation)
        // Simulate
        // this.mesh.rotation.x = Math.sin(tick * configuration.sun.speed) * -0.4;
        this.mesh.rotation.x = this._rotation;
        // Look at and constrain
        // this.mesh.lookAt(this.sun.light.position);
        // this.mesh.rotation.x += Math.PI/2;
        // this.mesh.rotation.y = 0;
        // this.mesh.rotation.z = 0;
    }
}
