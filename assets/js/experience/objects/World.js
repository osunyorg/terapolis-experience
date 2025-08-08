import configuration from "../data/configuration";
import AnimationsManager from "../managers/AnimationsManager";
import BaseObject from "./BaseObject";

export default class World extends BaseObject {
    _setup () {
        const model = this.stage.assets.get( 'terrain' );
        this.content = model.data.scene;
        this.clips = model.data.animations;
        this.stage.scene.add( this.content );
        this.stage.objectsToUpdate.push( this );
        this.addAnimations();

        if (configuration.shadow.enabled) {
            this.addShadow();
        }
    }

    addAnimations () {
        this.animationManager = new AnimationsManager( this.content, this.clips );
    }

    addShadow () {
        this.content.children.forEach( ( child, index ) => {
            if ( child.name.includes( "Ground" ) ) {
                console.log(child)
                child.receiveShadow = true;
            } else {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        } );
    }


    update ( tick, delta ) {
        this.animationManager.update( delta );
    }
}