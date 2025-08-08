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
    }

    addAnimations () {
        this.animationManager = new AnimationsManager( this.content, this.clips );
    }

    update ( tick, delta ) {
        this.animationManager.update( delta );
    }
}