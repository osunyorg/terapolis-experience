import { BackSide, BoxGeometry, Color, EquirectangularReflectionMapping, LinearFilter, LinearMipMapLinearFilter, Mesh, MeshStandardMaterial, PlaneGeometry, ShaderLib, ShaderMaterial, SRGBColorSpace } from "three";
import configuration from "../data/configuration";

export default class PVTracker {
    constructor ( mesh, envMap, sun ) {
        this.mesh = mesh;
        this._shader = ShaderLib.equirect;
        this.mesh.material = new MeshStandardMaterial({
            roughness: 0.0,
            metalness: 0.7,
            envMapIntensity: 1.0,
            color: 0xAAAAAA,
            envMap: envMap
        });
        this.mesh.material.needsUpdate = true;

        this.sun = sun;
    }

    update ( tick, delta ) {
        // this.mesh.rotation.x = Math.sin( tick * configuration.sun.speed ) * 0.4
        // this.mesh.rotation.z += 0.01
        // this.mesh.lookAt(this.sun.position);
    }
}