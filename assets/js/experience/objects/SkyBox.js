import { BackSide, BoxGeometry, Color, EquirectangularReflectionMapping, LinearFilter, Mesh, MeshStandardMaterial, PlaneGeometry, ShaderLib, ShaderMaterial } from "three";
import BaseObject from "./BaseObject";
import configuration from "../data/configuration";

export default class SkyBox extends BaseObject {
    _setup () {
        const { enabled, toneMapped, size } = configuration.skyBox

        if (!enabled) return;

        this._shader = ShaderLib.equirect;
        this._material = new ShaderMaterial({
            fragmentShader: this._shader.fragmentShader,
            vertexShader: this._shader.vertexShader,
            uniforms: this._shader.uniforms,
            depthWrite: false,
            side: BackSide,
            toneMapped,
        });
        const box = new BoxGeometry( size, size, size );
        this._skybox = new Mesh( box, this._material );
        this.stage.scene.add( this._skybox );

        const background = this.stage.assets.get('environment');
        console.log(background)
        // this.update(background.data);
        this.update(new Color(configuration.skyBox.color));

        this.addFloor();
        
    }

    addFloor () {
        const ground = new Mesh(
            new PlaneGeometry( 10000, 10000 ),
            new MeshStandardMaterial( { color: 0x5E7855, depthWrite: true } )
        );

        ground.rotation.x = - Math.PI / 2;
        ground.position.y = -5;

        ground.receiveShadow = true;

        this.stage.scene.add( ground );
    }

    update ( background ) {
        if ( background.isColor ) {
            this._skybox.visible = false;
            this.stage.scene.background = background;
        } else {
            this._skybox.visible = true;
            background.mapping = EquirectangularReflectionMapping;
            background.magFilter = LinearFilter;
            background.minFilter = LinearFilter;
            this._skybox.material.uniforms.tEquirect.value = background;
        }
    }
}