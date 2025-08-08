import { AnimationClip, AnimationMixer } from "three";

export default class AnimationsManager {
    constructor ( object, clips ) {
        this.mixer = new AnimationMixer( object );
        this.animations = clips;
        this.animations.forEach(animation => this.add( animation ));
    }

    add ( animation ) {
        this.mixer.clipAction( animation ).reset().play();
    }

    update ( delta ) {
        this.mixer.update( delta );
    }

}